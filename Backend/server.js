const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { json } = require("body-parser");
const QRCode = require('qrcode');




const app = express();
const path = require("path");
const { error } = require("console");
app.use("/qrcodes", express.static(path.join(__dirname, "qrcodes")));

app.use(cors());
app.use(express.json());


// MySQL Connection

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: "192.168.5.20",
    user: "remote_user",
    password: "Bail@123",
    database: "employee_auth",
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      setTimeout(handleDisconnect, 2000); // retry after 2 sec
    } else {
      console.log("✅ MySQL Connected (employee_auth)");
    }
  });

  db.on("error", (err) => {
    console.error("MySQL error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.post("/signup", (req,res)=>{
  const sql= "INSERT INTO users (employee_code, employee_name, employee_department, employee_designation, employee_mobile, password) VALUES (?)"
  console.log("Request Body", req.body)
  const values= [
    req.body.employee_code,
    req.body.employee_name,
    req.body.employee_department,
    req.body.employee_designation,
    req.body.employee_mobile,
    req.body.password
  ]

  db.query(sql,[values], (err, data)=>{
    if(err){
      console.log(err);
      return res.json("Error");
    }
    return res.json(data)
  })
})

//login Api
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE `employee_code`= ? AND `password`= ?";
  console.log("Request Body", req.body);

  db.query(sql, [req.body.employee_code, req.body.password], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Database error" });
    }

    if (data.length > 0) {
      // ✅ Return success + employee details (important for auth check)
      return res.json({
        success: true,
        message: "Login successful",
        employee_code: data[0].employee_code,
        employee_name: data[0].employee_name,
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  });
});


// Generate QR Code API
app.post("/generate-qr", async (req, res) => {
  console.log("Request Body QR: ", req.body);

  const {
    employee_code,
    employee_name,
    employee_designation,
    employee_department,
  } = req.body;

  const qrPath = `qrcodes/${employee_code}.png`;
  const qrFullPath = path.join(__dirname, qrPath);

  try {
    // 🔒 Step 1: Authorization Check (compare login user with requested code)
    const loggedInEmployee = req.headers["x-employee-code"];
    console.log("🔍 Logged In:", loggedInEmployee, "| Trying to generate for:", employee_code);

    if (!loggedInEmployee) {
      return res.status(401).json({
        success: false,
        message: "No logged-in employee found. Please login first.",
      });
    }

    if (employee_code !== loggedInEmployee) {
      console.log("🚫 Unauthorized QR generation attempt");
      return res.status(403).json({
        success: false,
        message: "You are not authorized to generate QR for this employee.",
      });
    }

    // ✅ Step 2: Generate QR file locally
    const qrScanUrl = `https://192.168.5.20:5175/canteen-scanner?code=${employee_code}`;
    await QRCode.toFile(qrFullPath, qrScanUrl);
    console.log("✅ QR file generated successfully");
    // ✅ Step 3: Check if employee QR already exists
    db.query("SELECT * FROM employee_qr WHERE employee_code = ?", [employee_code], async (err, results) => {
      if (err) {
        console.error("DB Select Error", err);
        return res.status(500).json({ success: false, error: "Database Error" });
      }

     
      
      const qrImage = await QRCode.toDataURL(qrScanUrl);


      if (results.length > 0) {
        // 🌀 Update existing QR
        const updateSql = `
          UPDATE employee_qr 
          SET employee_name = ?, employee_designation = ?, employee_department = ?, qrImage = ? 
          WHERE employee_code = ?
        `;
        const updateValues = [employee_name, employee_designation, employee_department, qrImage, employee_code];

        db.query(updateSql, updateValues, (updateErr) => {
          if (updateErr) {
            console.error("DB Update Error:", updateErr);
            return res.status(500).json({ success: false, error: "Database update failed" });
          }

          console.log("✅ QR Updated Successfully");
          return res.json({
            success: true,
            message: "QR updated successfully",
            qr_url: `https://192.168.5.20:8281/${qrPath}`,
            qrImage,
          });
        });
      } else {
        // 🆕 Insert new QR
        const insertSql = `
          INSERT INTO employee_qr (employee_code, employee_name, employee_designation, employee_department, qrImage)
          VALUES (?, ?, ?, ?, ?)
        `;
        const insertValues = [employee_code, employee_name, employee_designation, employee_department, qrImage];

        db.query(insertSql, insertValues, (insertErr) => {
          if (insertErr) {
            console.error("DB Insert Error:", insertErr);
            return res.status(500).json({ success: false, error: "Database insertion failed" });
          }

          console.log("✅ QR Generated and stored Successfully");
          return res.json({
            success: true,
            message: "QR generated successfully",
            qr_url: `https://192.168.5.20:8281/${qrPath}`,
            qrImage,
          });
        });
      }
    });
  } catch (err) {
    console.error("❌ QR Generation Failed:", err);
    return res.status(500).json({ success: false, error: "QR generation failed" });
  }
});


// Get Employee Info API
app.get("/get-employee/:code", (req, res) => {
  const code = req.params.code;

  const sql = "SELECT * FROM users WHERE employee_code = ?";
  db.query(sql, [code], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (results.length > 0) {
      return res.json(results[0]); // send employee details
    } else {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
  });
});



// Qr code check API
app.get("/check-qr/:employee_code", (req, res)=>{
  const employee_code= req.params.employee_code;

  const sql="SELECT * FROM employee_qr WHERE employee_code=?"
  db.query(sql, [employee_code], async(err, results)=>{
    if(err){
      console.log("DB Select Error", err)
      return res.status(500).json({success: false, error: "Database error"});
    }
    if(results.length>0){
      const qrPath = results[0].qrImagePath;
      
      return res.json({
        success: true,
        qrExists: true,
        qrImage: results[0].qrImage
      });
    }else{
      return res.json({success: false, qrExists: false})
    }
  })
})


//fetch all employee data
app.get("/api/employees", (req, res) => {
  const query = "SELECT employee_code, employee_name, employee_department, employee_designation FROM employee_qr";
  db.query(query, (err, results) => {
    if (err) {
      console.log("Employees not fetching")
      console.error("Error fetching employees:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});


//UPDATE WALLET
app.post("/admin/update-wallet", (req, res) => {
  const { employee_code, employee_name, breakfast_credits, lunch_dinner_credits } = req.body;

  console.log("📩 Req Body:", req.body);

  // Step 1️⃣ — Check if wallet exists
  const checkQuery = "SELECT * FROM employee_wallet WHERE employee_code = ?";
  db.query(checkQuery, [employee_code], (err, results) => {
    if (err) {
      console.error("❌ Error checking wallet:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Step 2️⃣ — If wallet exists → ADD values (not overwrite)
    if (results.length > 0) {
      const current = results[0];
      const newBreakfast = current.breakfast_credits + Number(breakfast_credits);
      const newLunchDinner = current.lunch_dinner_credits + Number(lunch_dinner_credits);

      const updateQuery = `
        UPDATE employee_wallet 
        SET breakfast_credits = ?, lunch_dinner_credits = ? 
        WHERE employee_code = ?`;

      db.query(updateQuery, [newBreakfast, newLunchDinner, employee_code], (err2) => {
        if (err2) {
          console.error("❌ Error updating wallet:", err2);
          return res.status(500).json({ error: "Wallet update error" });
        }

        // Step 3️⃣ — Log transaction
        const transactionQuery = `
          INSERT INTO wallet_transactions 
          (employee_code, transaction_type, amount, category, done_by) 
          VALUES (?, ?, ?, ?, ?)`;

        const category =
          Number(breakfast_credits) > 0
            ? "BreakfastSnacks"
            : "LunchDinner";

        const totalAmount = Number(breakfast_credits) + Number(lunch_dinner_credits);

        db.query(
          transactionQuery,
          [employee_code, "credit", totalAmount, category, "Admin"],
          (err3) => {
            if (err3) {
              console.error("❌ Error inserting transaction:", err3);
              return res.status(500).json({ error: "Transaction log error" });
            }

            console.log("✅ Wallet Updated (Added Amount) & Transaction Logged");
            return res.json({ success: true, message: "Wallet balance added successfully" });
          }
        );
      });
    } 
    // Step 4️⃣ — If wallet not exist → create new one
    else {
      const insertWallet = `
        INSERT INTO employee_wallet 
        (employee_code, employee_name, breakfast_credits, lunch_dinner_credits)
        VALUES (?, ?, ?, ?)`;

      db.query(insertWallet, [employee_code, employee_name, breakfast_credits, lunch_dinner_credits], (err4) => {
        if (err4) {
          console.error("❌ Error inserting new wallet:", err4);
          return res.status(500).json({ error: "Wallet insert error" });
        }

        // Step 5️⃣ — Log transaction
        const transactionQuery = `
          INSERT INTO wallet_transactions 
          (employee_code, transaction_type, amount, category, done_by) 
          VALUES (?, ?, ?, ?, ?)`;

        const category =
          Number(breakfast_credits) > 0
            ? "BreakfastSnacks"
            : "LunchDinner";

        const totalAmount = Number(breakfast_credits) + Number(lunch_dinner_credits);

        db.query(
          transactionQuery,
          [employee_code, "credit", totalAmount, category, "Admin"],
          (err5) => {
            if (err5) {
              console.error("❌ Error inserting transaction (new wallet):", err5);
              return res.status(500).json({ error: "Transaction log error (new wallet)" });
            }

            console.log("✅ New Wallet Created & Transaction Logged Successfully");
            return res.json({ success: true, message: "New wallet created & transaction logged successfully" });
          }
        );
      });
    }
  });
});



app.post("/admin/add-transaction", (req, res)=>{
  const {employee_code, transaction_type, amount, category, done_by}= req.body

  if(!employee_code || !transaction_type || !amount || !category || !done_by ){
    return res.status(400).json({error: "All fields are required"});
  }
  const sql= "INSERT INTO wallet_transactions(employee_code, transaction_type, amount, category, done_by)  VALUES (?, ?, ?, ?, ?)"
  db.query(sql, [employee_code, transaction_type, amount, category, done_by],(err)=>{
    if(err){
      console.log("DB Error:", err)
      res.status(500).json({error: "Database Error"})
    }
    console.log("Transaction added Successfully");
    res.json({success: true, message: "Transaction added successfully"})
  })


})
app.get("/admin/transactions", (req, res) => {
  const sql = `
    SELECT * FROM wallet_transactions
    ORDER BY created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("❌ DB Error:", err);
      return res.status(500).json({ error: "Database Error" });
    }
    res.json(results);
  });
});

// ✅ Get wallet data by employee code (Employee system)
app.get("/api/wallet/:code", (req, res) => {
  const employeeCode = req.params.code;
  const query = `
    SELECT employee_code, breakfast_credits, lunch_dinner_credits 
    FROM employee_wallet 
    WHERE employee_code = ?
  `;

  db.query(query, [employeeCode], (err, result) => {
    if (err) {
      console.error("Error fetching wallet data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Wallet not found for employee" });
    }
    res.json(result[0]);
  });
});


// transaction history api
app.post("/api/deduct-credits", (req, res) => {
  const { employee_code, meal_type, amount } = req.body;

  const getWallet = `SELECT * FROM employee_wallet WHERE employee_code = ?`;
  db.query(getWallet, [employee_code], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error while fetching wallet" });
    if (results.length === 0) return res.status(404).json({ error: "Wallet not found" });

    const wallet = results[0];
    let newCredits;

    if (meal_type === "breakfast") {
      if (wallet.breakfast_credits < amount)
        return res.status(400).json({ error: "Insufficient breakfast credits" });

      newCredits = wallet.breakfast_credits - amount;
      db.query(
        "UPDATE employee_wallet SET breakfast_credits = ? WHERE employee_code = ?",
        [newCredits, employee_code]
      );
    } else {
      if (wallet.lunch_dinner_credits < amount)
        return res.status(400).json({ error: "Insufficient lunch/dinner credits" });

      newCredits = wallet.lunch_dinner_credits - amount;
      db.query(
        "UPDATE employee_wallet SET lunch_dinner_credits = ? WHERE employee_code = ?",
        [newCredits, employee_code]
      );
    }

    // Insert transaction history
    db.query(
      `INSERT INTO employee_transaction_history (employee_code, meal_type, amount_deducted, remaining_balance)
       VALUES (?, ?, ?, ?)`,
      [employee_code, meal_type, amount, newCredits]
    );

    res.json({ message: "Credits deducted successfully", remaining_balance: newCredits });
  });
});







// app.post("/mealbooking", (req, res)=>{
//   const sql= "INSERT INTO users (employee_code, employee_name, employee_department, employee_designation, meal_type, number_thalis, booking_time, booking_date) VALUES (?)"
//   console.log("Request Body: ", req.body)
// })


// db.end();// sql database connecttion end point

app.listen(8081, () => {
  console.log(`Connected to MySQL on local WiFi (192.168.5.20)'`);
  
});

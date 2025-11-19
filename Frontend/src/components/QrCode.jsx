import React, { useState } from "react";
import axios from "axios";

function EmployeeForm() {
  const [formData, setFormData] = useState({
    employee_code: "",
    employee_name: "",
    employee_designation: "",
    employee_department: "",
  });
  const [qrImage, setQrImage] = useState("");
  const [checked, setChecked] = useState(false);

  // 🟢 Assume current logged-in employee code stored in localStorage
  const loggedInEmployeeCode = localStorage.getItem("employee_code");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 Step 1: Check QR
  const checkQr = async () => {
    if (!formData.employee_code) {
      alert("Please Enter Employee Code");
      return;
    }

    // 🔴 If user tries someone else’s code
    if (loggedInEmployeeCode && formData.employee_code !== loggedInEmployeeCode) {
      alert("⚠️ You are not authorized to generate QR for this employee.");
      return;
    }

    try {
      const res = await axios.get(
        `http://192.168.5.20:8081/check-qr/${formData.employee_code}`
      );

      if (res.data.qrExists) {
        setQrImage(res.data.qrImage);
      } else {
        setQrImage(""); // not generated
      }
      setChecked(true);
    } catch (err) {
      console.error(err);
      alert("Error checking QR. Please try again.");
    }
  };

  // 🟢 Step 2: Generate QR
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Again check unauthorized access before calling API
    if (loggedInEmployeeCode && formData.employee_code !== loggedInEmployeeCode) {
      alert("⚠️ You are not authorized to generate QR for this employee.");
      return;
    }

    try {
      const res = await axios.post(
        "http://192.168.5.20:8081/generate-qr",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-employee-code": loggedInEmployeeCode, // 🟢 ensure proper auth header
          },
        }
      );

      if (res.data.success) {
        setQrImage(`http://192.168.5.20:8081/${res.data.qrFilePath}`);
        alert("✅ QR Generated Successfully!");
      } else {
        alert(res.data.message || "QR generation failed. Try again.");
      }
    } catch (err) {
      console.error(err);

      // 🟢 FIX: Handle backend unauthorized error clearly
      if (err.response && err.response.status === 403) {
        alert("⚠️ You are not authorized to generate QR for this employee.");
      } else {
        alert("Server error while generating QR.");
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee QR Generator</h2>

      {/* Step 1: Enter employee code */}
      {!checked && (
        <div>
          <input
            className="form-control"
            name="employee_code"
            type="text"
            placeholder="Enter Employee Code"
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-primary" onClick={checkQr}>
            Check QR
          </button>
        </div>
      )}

      {/* Step 2: If QR already exists */}
      {checked && qrImage && (
        <div>
          <h3>QR Code Already Generated</h3>
          <img src={qrImage} alt="QR" style={{ width: "200px" }} />
          <p>QR for Employee: {formData.employee_code}</p>
        </div>
      )}

      {/* Step 3: If no QR found, show form */}
      {checked && !qrImage && (
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            name="employee_code"
            placeholder="Employee Code"
            onChange={handleChange}
          />
          <br />
          <input
            className="form-control"
            name="employee_name"
            placeholder="Name"
            onChange={handleChange}
          />
          <br />
          <input
            className="form-control"
            name="employee_designation"
            placeholder="Designation"
            onChange={handleChange}
          />
          <br />
          <input
            className="form-control"
            name="employee_department"
            placeholder="Department"
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-success" type="submit">
            Generate QR
          </button>
        </form>
      )}
    </div>
  );
}

export default EmployeeForm;

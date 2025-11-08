import React, { useEffect, useState } from "react";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const employeeCode = localStorage.getItem("employee_code");
    if (!employeeCode) {
      setError("⚠️ Employee code not found. Please login again.");
      return;
    }

    fetch(`http://localhost:8281/employee/transactions/${employeeCode}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTransactions(data);
        } else {
          setError("No transactions found.");
        }
      })
      .catch(() => setError("Error fetching transaction data."));
  }, []);

  if (error) return <p className="text-red-600 mt-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">💳 Transaction History</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Date & Time</th>
            <th className="border p-2">Meal Type</th>
            <th className="border p-2">Token No</th>
            <th className="border p-2">Amount Deducted</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={index} className="text-center hover:bg-gray-50">
              <td className="border p-2">
                {new Date(t.order_time).toLocaleString()}
              </td>
              <td className="border p-2">{t.meal_type}</td>
              <td className="border p-2">{t.token_number}</td>
              <td className="border p-2 text-red-500 font-semibold">
                ₹{t.amount_deducted}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;

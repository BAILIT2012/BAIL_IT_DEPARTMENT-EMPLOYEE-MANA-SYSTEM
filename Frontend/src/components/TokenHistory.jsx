import React, { useEffect, useState } from "react";

function TokenHistory() {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8281/token-history")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        console.log("🎫 Token history:", data);
        setTokens(data);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setError("Failed to load token history");
      });
  }, []);

  if (error) return <p className="text-center mt-5 text-red-600">{error}</p>;
  if (tokens.length === 0) return <p className="text-center mt-5">No token data yet...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        🎫 Employee Token History
      </h2>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Token Number</th>
            <th className="border p-2">Employee Code</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Meal Type</th>
            <th className="border p-2">Order Time</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t, index) => (
            <tr key={t.id} className="hover:bg-gray-50 text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2 font-semibold text-blue-600">{t.token_number}</td>
              <td className="border p-2">{t.employee_code}</td>
              <td className="border p-2">{t.employee_name}</td>
              <td className="border p-2">{t.meal_type}</td>
              <td className="border p-2">{t.amount_deducted}</td>
              <td className="border p-2">{new Date(t.order_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TokenHistory;

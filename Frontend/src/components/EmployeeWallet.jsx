import React, { useState } from "react";

const EmployeeWallet = () => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchWallet = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setWallet(null);

    try {
      const res = await fetch(`http://192.168.5.20:8321/admin/check-wallet/${employeeCode}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Employee not found");
      }

      setWallet(data.wallet);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Employee Wallet Check
      </h2>

      <form onSubmit={handleFetchWallet} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Employee Code"
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
          className="border p-2 rounded flex-grow"
          required
        />
        <button
          type="submit"
          className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Check Wallet
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {wallet && (
        <div className="border rounded-lg p-4 shadow-md bg-white mt-4">
          <h3 className="text-xl font-semibold mb-2 text-center text-gray-700">
            {wallet.employee_name} ({wallet.employee_code})
          </h3>
          <div className="flex justify-around mt-3">
            <div className="text-center">
              <h4 className="text-gray-500">Breakfast/Snacks</h4>
              <p className="text-2xl font-bold text-green-600">
                {wallet.breakfast_credits}
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-gray-500">Lunch/Dinner</h4>
              <p className="text-2xl font-bold text-orange-600">
                {wallet.lunch_dinner_credits}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeWallet;

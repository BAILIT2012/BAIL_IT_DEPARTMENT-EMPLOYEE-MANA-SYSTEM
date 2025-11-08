// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import MealBooking from "./components/MealBooking";
import EmployeeForm from "./components/QrCode";
import EmployeeWallet from "./components/EmployeeWallet";
import TransactionHistory from "./components/EmployeeTransactionHistory";
import TokenHistory from "./components/TokenHistory";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/mealbooking" element={<MealBooking />} />
      <Route path="/generate-qr" element={<EmployeeForm />} />
      <Route path="/employee-wallet" element={<EmployeeWallet />} />
      <Route path="/employee_transactionHistory" element={<TransactionHistory/>} />
      <Route path="/token-history" element={<TokenHistory/>} />   
      


    </Routes>
  );
}

export default App;

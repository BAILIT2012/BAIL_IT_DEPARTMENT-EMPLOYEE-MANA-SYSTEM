import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginValidation from "../../../Backend/validations/LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    employee_code: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(LoginValidation(values));

    if (errors.employee_code === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data.success) {
  localStorage.setItem("employee_code", res.data.employee_code); // ✅ Store employee_code for QR authorization
  navigate('/home');
} else {
  alert(res.data.message || "No Record existed");
}

        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 rounded w-10" style={{ width: "30rem" }}>
        <img
          style={{ height: "50px", width: "80px", margin: "0 auto" }}
          src="./images/BAIL_LOGO.jpg"
          alt="BAIL Logo"
        />
        <h3 className="text-center mb-4 mt-3">Employee Login</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="employee_code">
              <b>Employe Code:</b>
            </label>
            <input
              onChange={handleInput}
              className="form-control"
              style={{ marginTop: "1rem", width: "25rem" }}
              name="employee_code"
              type="text"
              placeholder="Employee Code."
              value={values.employee_code}
            />
            {errors.employee_code && (
              <span className="text-danger">{errors.employee_code}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <b>Password:</b>
            </label>
            <input
              onChange={handleInput}
              style={{ marginTop: "1rem", width: "25rem" }}
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn btn-success mt-4">
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

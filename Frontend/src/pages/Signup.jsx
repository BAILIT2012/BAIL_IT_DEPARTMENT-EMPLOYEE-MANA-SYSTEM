import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupValidation from "../../../Backend/validations/SignupValidation";
import axios from "axios";

function Signup() {
  const [values, setValues]= useState({
  employee_code: "",
  employee_name: "",
  employee_department: "",
  employee_designation: "",
  employee_mobile: "",
  password: "",
})  

const navigate =useNavigate();
const [errors, setErrors]=useState({})
const handleInput=(event)=>{
  setValues(prev=>({...prev, [event.target.name]: event.target.value}));
  
}

 const handleSubmit= (event)=>{ 
  event.preventDefault();
  setErrors(SignupValidation(values));
  if(errors.employee_code=== "" && errors.employee_name=== "" && errors.employee_department=== "" && errors.employee_designation=== "" && errors.employee_mobile=== "" && errors.password=== ""){
    axios.post('http://localhost:8081/signup', values)
    .then(res=> {
      navigate('/')
    }
    )
    .catch(err=> console.log(err))
  }
 }


  return (
    <div className="d-flex justify-content-center align-items-center vh-80 bg-light">
      <div className="card shadow p-4" style={{ width: "25rem" }}>
        <img style={{height: "50px", width: "80px", margin: "0 auto"}} src="./images/BAIL_LOGO.jpg" alt="BAIL Logo" />
        <h3 className="text-center mb-4">Employee Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Employee Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter employee code"
              name="employee_code"
              onChange={handleInput}
              value={values.employee_code}
              />
               {errors.employee_code && <span className="text-danger">{errors.employee_code}</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Employee Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter employee Name"
              name="employee_name"
              onChange={handleInput}
              value={values.employee_name}
              />
               {errors.employee_name && <span className="text-danger">{errors.employee_name}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Department</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter employee Department"
              name="employee_department"
              onChange={handleInput}
              value={values.employee_department}
              />
               {errors.employee_department && <span className="text-danger">{errors.employee_department}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Designation</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter employee designation"
              name="employee_designation"
              onChange={handleInput}
              value={values.employee_designation}
              />
              {errors.employee_designation && <span className="text-danger">{errors.employee_designation}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter mobile number"
              name="employee_mobile"
              onChange={handleInput}
              value={values.employee_mobile}
              />
               {errors.employee_mobile && <span className="text-danger">{errors.employee_mobile}</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
              value={values.password}
              />
               {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div> */}

          <button onSubmit={handleSubmit} type="submit" className="btn btn-success w-100">
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

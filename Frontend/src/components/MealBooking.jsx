import React, { useState } from "react";
import axios from "axios";

import "./MealBooking.css"; // minimal custom CSS

const MealBooking = () => {
  const [MealData, setMealData] = useState({
    employee_code: "",
    employee_name: "",
    employee_department: "",
    employee_designation: "",
    mealType: "",
    thaliCount: "",
    mealTime: "",
    date: "",
    requests: "",
  });
   const [selectedDate, setSelectedDate]= useState(new Date().toISOString().split("T")[0]);
   const [errors, setErros]= useState({});

  const handlInput=(event)=>{
    setMealData(prev=>({...prev,[event.target.name]: event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // validation
    
    axios.post('http://192.168.5.20:8081/mealbooking', MealData)
    alert("✅ Meal booked successfully!");
  };

  const handleDateChange = (e) => {
    const today = new Date().toISOString().split("T")[0];
    if (e.target.value < today) {
      alert("Purani date select nahi kar sakte. Aaj ki date select ho gayi hai.");
      setSelectedDate(today);
    } else {
      setSelectedDate(today); // hum sirf aaj ki date allow kar rahe hain
    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient p-3">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "450px" }}>
        <h1 className="text-center text-dark mb-4 text-uppercase fw-bold">
          Book Your Meal
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Employee Code</label>
            <input
              type="text"
              className="form-control"
              name="employee_code"
              placeholder="Enter Employee Code"
              value={MealData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Employee Name</label>
            <input
              type="text"
              className="form-control"
              name="employee_name"
              placeholder="Enter your name"
              value={MealData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Employee Department</label>
            <input
              type="text"
              className="form-control"
              name="employee_department"
              placeholder="Enter Employee Code"
              value={MealData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Employee Designation</label>
            <input
              type="text"
              className="form-control"
              name="employee_designation"
              placeholder="Enter Employee Code"
              value={MealData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Meal Type</label>
            <select
              className="form-select"
              name="meal_type"
              value={MealData.mealType}
              onChange={handleChange}
              required
            >
              <option value="">Select a meal</option>
              <option value="breakfast">Breakfast Thali</option>
              <option value="lunch">Lunch Thali</option>
              <option value="dinner">Dinner Thali</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Number of Thalis</label>
            <input
              type="number"
              className="form-control"
              name="number_thalis"
              min="1"
              placeholder="Enter number of Thalis"
              value={MealData.thaliCount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Booking Time</label>
            <input
              type="time"
              className="form-control"
              name="meal_time"
              value={MealData.mealTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold"> Booking Date</label>
            
      <input
        className="form-control"
        name= "booking_date"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={new Date().toISOString().split("T")[0]} // piche ki date disable
      />
    </div>

          <button
            type="submit"
            className="btn btn-success  w-100 fw-semibold py-2"
          >
            Book Thali
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealBooking;

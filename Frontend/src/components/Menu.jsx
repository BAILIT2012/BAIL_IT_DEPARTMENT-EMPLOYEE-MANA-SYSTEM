import React from "react";
import NavBar from "./Navbar";
import "./css/Menu.css";

const menuData = [
  {
    day: "MONDAY",
    breakfast: "PLAIN PARATHA + SABJI + ACHAR (2PCS)",
    lunch: "ARHAR DAL, TADKA + MIX VEG + ROTI + RICE + SALAD + RAYTA",
    dinner: "MIX DAL + ALOO SHIMLA + ROTI + JIRA RICE + SALAD",
  },
  {
    day: "TUESDAY",
    breakfast: "POHA + JALEBI (2PCS)",
    lunch: "URD DHOBA DAL + BEGAN ALOO + ROTI + JIRA RICE + RAYTA + SALAD",
    dinner: "KALI MASOOR + LOKI DRY + RICE + ROTI + SALAD",
  },
  {
    day: "WEDNESDAY",
    breakfast: "IDLI SAMBHAR (4PCS)",
    lunch:
      "KADHI PAKORA + ALOO PATTA GOBHI + ROTI + JIRA RICE + SALAD + HALVA",
    dinner: "ARHAR DAL + ALOO PYAZ MASALA + ROTI + RICE + SALAD",
  },
  {
    day: "THURSDAY",
    breakfast: "CHOLE + BHATURE + PICKLE (2PCS)",
    lunch:
      "MOONG DAL TAMATAR MATER ALOO + ROTI + RICE + SALAD + RAYTA",
    dinner: "DAL MAKHNI + ALOO PATA GOBHI + ROTI + ZIRA RICE + SALAD",
  },
  {
    day: "FRIDAY",
    breakfast: "KACHODI + SABJI",
    lunch:
      "KALI MASOOR + ALOO GOBHI + RICE + ROTI + SALAD + MIX RAYTA",
    dinner: "MOONG DAL + KASI FAL DRY + JIRA RICE + ROTI + SALAD",
  },
  {
    day: "SATURDAY",
    breakfast: "ALOO PYAZ PARATHA + DAHI",
    lunch: "DAL MAKHNI + KOFTA + ROTI + ZIRA RICE + SALAD + KHEER",
    dinner: "CHOLE + BHINDI + ROTI + JIRA RICE + SALAD",
  },
];

const Menu = () => {
  return (
    <>
    <NavBar/>
    <div className="canteen-menu-page d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="container bg-white shadow-lg rounded-4 p-4 animate-fadeIn">
        {/* Header Section */}
        <div className="text-center mb-4 header-section p-3 rounded">
          <h2 className="fw-semibold">Canteen Menu - October 2025</h2>
        </div>

        {/* Table Section */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-success">
              <tr>
                <th>DAYS</th>
                <th>BREAK FAST</th>
                <th>LUNCH</th>
                <th>DINNER</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((item, index) => (
                <tr key={index}>
                  <td className="fw-semibold text-success">{item.day}</td>
                  <td>{item.breakfast}</td>
                  <td>{item.lunch}</td>
                  <td>{item.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature Section */}
        <div className="signature mt-4 text-center">
          <p className="fst-italic text-success">
            — Canteen Managed by Brindavan Agro Industries Pvt. Ltd —
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Menu;
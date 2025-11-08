import React from "react";
import NavBar from "../components/Navbar";
import "./css/Home.css";
import { Link } from "react-router-dom";

const cards = [
  { title: "Employee Wallet", desc: "Check your wallet balance or add funds.", link: "/employee-wallet", button: "View Balance" },
  { title: "Book My Meal", desc: "Generate Token Number", link: "/mealbooking", button: "Generate Now" },
  { title: "Token History", desc: "Track your past orders and bookings.", link: "/token-history", button: "History" },
  { title: "Transaction Detail", desc: "Review your payment history and receipts.", link: "/transaction_detail", button: "Check Transactions" },
  { title: "QR Code", desc: "Generate your Qr Code", link: "/generate-qr", button: "History" }
];

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="home-page">
        <div className="content-wrap">
          <nav className="card-container">
            {cards.map((card, index) => (
              <div key={index} className="home-card">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <Link to={card.link}>
                  <button className="card-button btn btn-success">{card.button}</button>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        <footer className="footer">
          <p>© Powered by Brindavan Agro Industries Pvt Ltd - IT Department</p>
        </footer>
      </div>
    </>
  );
};

export default Home;

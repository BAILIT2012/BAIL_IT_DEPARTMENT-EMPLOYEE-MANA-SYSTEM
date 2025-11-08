import React from "react";
import { Link } from "react-router-dom"; // Router link
function NavBar(){
    return(
    <nav className="navbar navbar-expand-lg border-bottom" style={{backgroundColor: "#ffff"}}>
  <div className="container p-2">
    <Link>
      <img style={{width: "5rem"}} src="./images/BAIL_LOGO.jpg" alt="Logo" to="/" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mb-lg-0 ms-auto">
          <li className="nav-item">
          <Link className="nav-link active" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/menu">Menu</Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link active" to="/feedback">Feedback</Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link active" to="/login">Logout</Link>
        </li>
      </ul>  
    </div>
  </div>
</nav>
    )
}

export default NavBar;
import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid my-2">
          <Link className="navbar-brand fw-bold text-white fs-4" to="/">⚡ DevNote</Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
              <li className="nav-item">
                <Link 
                  className={`nav-link nav-zoom-link ${location.pathname === "/" ? "active-zoom" : ""}`} 
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link nav-zoom-link ${location.pathname === "/About" || location.pathname === "/about" ? "active-zoom" : ""}`} 
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem('token') ? (
              <form className="d-flex" role="search">
                <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
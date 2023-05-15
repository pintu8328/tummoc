import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    navigate("/signin");
  };

  return (
    <div className="navbar">
      <button>
        <Link className="link" to="/home">
          Home
        </Link>
      </button>
      <div>
        <button>
          <Link className="link" to="/">
            {" "}
            Signup/login
          </Link>
        </button>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;

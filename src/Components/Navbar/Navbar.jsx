import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";


export const Navbar = () => {
  const [nav,setnav]=useState(false);
  const changeBackgorund = () =>{
    if  (window.scrollY >= 50) {
      setnav(true)
    } else {
      setnav(false)
    }
  }
  window.addEventListener('scroll',changeBackgorund)
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className={nav? "nav active": "nav"}>
      <Link to="/" className="title">
        Virtual Surgery
      </Link>
      
      <label className="menu-icon" for="menu-btn"></label>
      <span className="nav-icon"></span>

      <ul >
        <li>
          <NavLink to="/about" >About</NavLink>
        </li>
        <li>
          <NavLink to="/services" >Features</NavLink>
        </li>
        <li>
          <NavLink to="/contact" >Contact</NavLink>
        </li>
        <li>
          <NavLink to="/login" >Login</NavLink>
        </li>
        <li>
        {auth ? (
            <NavLink to="/logout">Logout</NavLink>
            ) : (
            <NavLink to="/signup">Signup</NavLink>
            )}
        </li>
      </ul>
    </nav>
  );
};
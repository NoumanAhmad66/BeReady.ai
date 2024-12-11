import React from "react";
import "./Navbar.css";
import logo from "../../assets/logosps.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar" class="navbar navbar-expand-lg bg-white shadow-lg fixed-top align-items-lg-center top-0">
      <div class="container-fluid py-lg-1 py-sm-1 py-1">
        <a class="navbar-brand mx-0" href="#">
          <img className="logo" src={logo} />
        </a>
        <a className="title">Software Productivity Strategists Inc.</a>
        <button
          class="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav nav-content ms-auto mb-lg-0 align-items-lg-center">
            <li class="nav-item">
              <Link to="/" class="nav-link active">Home</Link>
            
            </li>
            <li class="nav-item">
              <Link to="/Solution" class="nav-link" >
                Solutions
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Blog
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link "
                href="#"
                role="button"
                aria-expanded="false"
              >
                About Us
              </a>
            
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Contact Us
              </a>
            </li>
            
          </ul>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav left-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link main-btn" href="#">
                Schedule <span className=" text-lowercase">a</span> Demo
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link white-btn" href="#">
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

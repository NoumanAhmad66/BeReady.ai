import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebookF,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import logo from "../../assets/logosps.png";

const Footer = () => {
  return (
    <section id="footer" className="footer-back">
      <div className="container py-md-5 px-0 ">
        <div className="row  d-flex justify-content-between footer-sm">
          <div className="footer-col col-lg-4  col-md-6  col-12 ps-4 ps-md-0">
            <a>
            <img className="logo-footer logo" src={logo}/> 
            </a>
           
           <a className="title">Software Productivity Strategists Inc.</a>

           <span className="mx-0  desc">We have an award-winning team that includes IBM-certified inventors and champions who have won multiple worldwide competitions.</span>
          </div>
          <div className="footer-col mt-md-0 mt-3 ps-4 ps-md-0 col-lg-4 col-md-6 col-12">
            <h4>get help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-col mt-lg-0  mt-3 ps-4 ps-md-0 col-lg-4 col-md-12 col-12 ">
            <h4>follow us</h4>
            <div className="social-links">
            <a href="https://www.linkedin.com">
                  <FontAwesomeIcon icon={faLinkedin} className="icon-style" />
                </a>
                <a href="https://www.instagram.com">
                  <FontAwesomeIcon icon={faInstagram} className="icon-style" />
                </a>
                <a href="https://www.facebook.com">
                  <FontAwesomeIcon icon={faFacebookF} className="icon-style" />
                </a>
                <a href="https://www.twitter.com">
                  <FontAwesomeIcon icon={faXTwitter}  className="icon-style"/>
                </a>
            </div>
          </div>
          <div className="border-line my-4 "></div>
        <div className="col-lg-12 d-flex justify-content-center">
              <h4>© Copyright 2024. All rights reserved.</h4>
              </div>
        </div>
      
      </div>
    </section>
  );
};

export default Footer;

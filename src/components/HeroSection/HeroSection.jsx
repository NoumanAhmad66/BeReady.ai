import React from "react";
import "./HeroSection.css";
import "../../index.css"
import heroimg from '../../assets/herosec/hero-img.png'
import { Link } from "react-router-dom";

function HeroSection({title , description ,image}) {
  return (
    <section >
     
     <div className="container  hero-section">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <div className="banner-content">
              <h1>{title?title:(<>BeReady.ai<br/> Your<span> Al Interviewer</span></>)} </h1>
              <p>
                {description?description:"An AI-powered interviewer that hosts real-time, interactive interviews, instantly assessing candidates to easily identify top talent. Leave manual screening behind and step into a more efficient hiring process."}
              
              </p>
              <div className="Row ">
              <button type="button" class="main-btn">
                Sechdule <span className=" text-lowercase">a</span> Demo
              </button>
              <Link to="/Interview"><button  type="button" class="white-btn">
                Try AI Interview
              </button></Link>
              
            </div>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="hero-section-right">
              <img className=" img-style" src={image || heroimg} />
            </div>
          </div>
          
        </div>
        <div className="hero-section-img1"></div>
        <div className="hero-section-img2"></div>
    </div>
           
    </section>
    
  );
}

export default HeroSection;

import React, { useState } from "react";
import banner from "../../assets/Interview/interview4.png";
import "./interview.css";
import "../../index.css";
import roleData from "../../assets/Interview/interview-data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Interview() {
  // State for selected role
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Column (Image) */}
        <div className="col-lg-6 px-0">
          <img className="left-banner" src={banner} alt="Interview Banner" />
         
        </div>

        {/* Right Column (Content) */}
        <div className="col-lg-6 right-section-container">
          <div className="container right-section">
            
              {/* back-button */}
              {selectedRole && (
                <div
                className="back-button mb-4"
                onClick={() => setSelectedRole(null)} // Reset state
              >
                <FontAwesomeIcon className="icon-back" icon={faChevronLeft} /> 
                <h5 className="mb-0">Back</h5>
              </div>
              )}
            
            {/* Top Content */}
            {!selectedRole ? (
               <div className="top-content my-3">
               <h1 className="main-heading mb-4">
                 Master live, conversational interviews with <br />
                 <span>BeReady.ai today!</span>
               </h1>
               <p className="sub-heading px-2">
                 Choose from popular interview roles or create your own custom
                 interview. BeReady.ai helps practice confidently for any job
                 you aim for.
               </p>
             </div>

            ):(
              <div className="top-content my-3 px-md-5">
              <h1 className="main-heading mb-4 text-start">
                Master live, conversational interviews with <br />
                <span>BeReady.ai today!</span>
              </h1>
              <p className="sub-heading mx-0 text-start mb-0">
                Choose from popular interview roles or create your own custom
                interview. BeReady.ai helps practice confidently for any job
                you aim for.
              </p>
            </div>
            )}
           

            {/* Buttons */}
            <div className="bottom-content">
              <div className="row px-lg-5 justify-content-center">
                {/* Render Buttons Dynamically Using map */}
                {!selectedRole &&
                  roleData.map((item, index) => (
                    <div
                      key={index}
                      className="col-lg-6 col-sm-6 mb-4 justify-content-center d-flex"
                    >
                      <button
                        type="button"
                        className="white-btn btn-1"
                        onClick={() => setSelectedRole(item)}
                      >
                        {item.role}
                      </button>
                    </div>
                  ))}

                {/* Main Button (conditionally hidden) */}
                {!selectedRole && (
                  <div className="col-lg-8 col-sm-12 mb-4 d-flex justify-content-center">
                    <button
                      type="button"
                      className="main-btn btn-2"
                      onClick={() => alert("Creating custom interview!")}
                    >
                      I want to design my personalized interview.
                    </button>
                  </div>
                )}
              </div>

              {/* Display Data Based on Button Click */}
              {selectedRole && (
                <div className="role-data px-md-5">
                  <h3 className="heading-role">{selectedRole.role}</h3>
                  {/* Description  */}
                  <div class="form-floating mb-4">
                    <h4>Job Description</h4>
                    <textarea
                      class="form-control bg-success p-2 text-dark bg-opacity-10 border border-info"
                      rows="6"
                      value={selectedRole.description}
                      readonly

                    >
                    </textarea>
                  </div>

                  {/* Duration */}
                  <div class="mb-4">
                    <label for="interview-duration" class="form-label">
                      Interview duration (mins)
                    </label>
                    <select
                      class="form-select bg-success p-2 text-dark bg-opacity-10 border border-info"
                      id="interview-duration"
                    >
                      <option selected>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>30</option>
                    </select>
                  </div>

                  {/* check box */}
                  <div class="form-check mb-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="match-opportunities"
                    />
                    <label class="form-check-label" for="match-opportunities">
                      Match me with opportunities
                    </label>
                  </div>

                  {/* Button */}
                  <div class="row d-flex justify-content-center gap-lg-3 gap-3  mt-lg-3 mt-3 ">
                    <Link to="/InterviewScreen"  class="col-lg-6 col-sm-6 main-btn bottom-btn-1">
                    <button>Submit</button>
                    </Link>
                    
                    <button class="col-lg-6 col-sm-6 white-btn bottom-btn-1">
                      Create custom interview
                    </button>
                  </div>

                  
                </div>


              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;

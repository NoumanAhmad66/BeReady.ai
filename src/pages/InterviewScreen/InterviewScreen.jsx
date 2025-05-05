import React from "react";
import { useState, useRef, useEffect } from "react";
import "./InterviewScreen.css";
import desktop from "../../assets/Interview/screen.png";
import mic from "../../assets/Interview/mic.png";
import camera from "../../assets/Interview/camera.png";
import phone from "../../assets/Interview/phone.png";
import cameraenable from  "../../assets/Interview/camre-enabel.png";
import micenable from "../../assets/Interview/mic-enabel.png";
import Swal from "sweetalert2";
import ChatBox from "../../components/Chatbox/Chatbox";

const InterviewScreen = () => {
  const [userData, setUserData] = useState({}); // Add this line
  const [isInterviewStarted, setIsInterviewStarted] = useState();
  const [isCameraOn, setIsCameraOn] = useState(true); // Track camera state
  const [isMicOn, setIsMicOn] = useState(true); // Track microphone state
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Store the media stream
  

  const handleForm = (e) => {
    e.preventDefault(); // Prevent page reload

    // Get form data
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    // Validation: Check if fields are empty
    if (!formObject.Username && !formObject.Email) {
      Swal.fire({
        icon: "error", // Error icon
        title: "Missing Fields",
        text: "Please fill in both Name and Email fields to start the interview.",
        customClass:{
          popup: "custom-popup",
          confirmButton: "main-btn",
        }
      });

      return; // Stop the function if validation fails
    }
    // if user-name field is empty
    else if (!formObject.Username){
      Swal.fire({
        icon: "error", // Error icon
        title: "Missing Field",
        text: "Please fill in User-name fields to start the interview.",
        customClass:{
          popup: "custom-popup",
          confirmButton: "main-btn",
        }
      });
      return; // Stop the function if validation fails
    }
    // if user-email field is empty
    else if (!formObject.Email){
      Swal.fire({
        icon: "error", // Error icon
        title: "Missing Field",
        text: "Please fill in  User-email fields to start the interview.",
        customClass:{
          popup: "custom-popup",
          confirmButton: "main-btn",
        }
      });
      return; // Stop the function if validation fails
    }
    // if both fields are filled
    else {
      Swal.fire({
        icon: "success", // Success icon
        title: "Form Submitted",
        text: "Thank you for submitting the form.",
        customClass:{
          popup: "custom-popup",
          confirmButton: "main-btn",
        }
      });
    }
     // Store user data
     setUserData({
      name: formObject.Username,
      email: formObject.Email
    });

   
    // Start the interview after form submission
    setIsInterviewStarted(true);
  };

  // useEffect to ensure the component is mounted before calling startInterview
  useEffect(() => {
    if (isInterviewStarted && videoRef.current) {
      startInterview();
    }
  }, [isInterviewStarted]);

  // Add media stream cleanup
const stopInterview = () => {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }
  if (videoRef.current) {
    videoRef.current.srcObject = null;
  }
  setIsInterviewStarted(false);
  setIsCameraOn(true);
  setIsMicOn(true);
};

// Add error boundary for media access
const startInterview = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(error => {
        console.error('Video play error:', error);
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Media Access Error',
      text: 'Please enable camera and microphone permissions to continue',
      footer: err.message
    });
  }
};
  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0]; // Get the video track
      if (videoTrack) {
        videoTrack.enabled = !isCameraOn; // Enable or disable the camera
        setIsCameraOn(!isCameraOn);
      }
    }
  };
  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0]; // Get the audio track
      if (audioTrack) {
        audioTrack.enabled = !isMicOn; // Enable or disable the microphone
        setIsMicOn(!isMicOn);
      }
    }
  };

  return (
    <div className="container-fluid vh-100 justify-content-center align-content-center bg-design">
      <div className="row py-2">
        {/* Left Panel */}
        <div className="col-lg-6 col-md-6 py-lg-0 py-2 d-flex justify-content-end align-content-center">
          {!isInterviewStarted ? (
            <div className="left-placeholder align-content-end">
              <div className="icons d-flex justify-content-lg-start justify-content-center align-items-center gap-4">
                <img className="left-panel-icon" src={mic} />
                <h5>Enable mic from settings</h5>
                <img className="left-panel-icon" src={camera} />
                <h5>Enable camera from settings</h5>
              </div>
            </div>
          ) : (
            <div className=" position-relative">
              <video
                ref={videoRef}
                className="w-100 call-screen"
                autoPlay
                muted={true} 
              ></video>
              {/* mic or camera enable-disable */}
              <div className="interview-controls">
                <img
                  className={`left-panel-icons ${isMicOn ? "" : "disabled"}`}
                  src={isMicOn ?  micenable :mic }
                  onClick={toggleMic}
                />

                <img
                  className="left-panel-icons"
                  src={phone}
                  onClick={stopInterview}
                />

                <img
                  className={`left-panel-icons ${isCameraOn ? "" : "disabled"}`}
                  src={isCameraOn ?  cameraenable:camera }
                  onClick={toggleCamera}
                />
              </div>{" "}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-start">
          {!isInterviewStarted ? (
            <div className="right-panel">
              <div className="d-flex justify-content-center mb-lg-3 mt-3">
                <img className="icon-panel" src={desktop} />
              </div>
              <div className="px-3 py-lg-2 py-2 ">
                <h4 className="mb-4 right-panel-heading">
                  You will receive your <span>interview results via email</span>{" "}
                  after completion.
                </h4>
                <form onSubmit={handleForm}>
                  <div className=" input-group mb-3">
                    <label className="input-group-text bg-success p-2 text-dark bg-opacity-10 border border-info">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control input-box bg-success p-2 text-dark bg-opacity-10 border border-info"
                      placeholder="Username"
                      name="Username"
                    ></input>
                  </div>
                  <div className="input-group mb-3">
                    <label className="input-group-text bg-success p-2 text-dark bg-opacity-10 border border-info">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control input-box bg-success p-2 text-dark bg-opacity-10 border border-info"
                      placeholder="Enter your email"
                      name="Email"
                    />
                  </div>
                  <button
                    variant="success"
                    className="main-btn mt-3"
                    type="submit"
                  >
                    Start Interview
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <><ChatBox micEnabled={isMicOn} userEmail={userData.email} /></>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default InterviewScreen;

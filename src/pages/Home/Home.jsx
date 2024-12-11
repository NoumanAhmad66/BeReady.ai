import React from "react";
import "./Home.css";
import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import cards_data from "../../assets/card/hero-card/Card-data.js";

const Home = () => {
  return (
    <>
      <HeroSection />
      <section>
        <div className="container-fluid py-5 mb-1 use-case-div-sm ">
          <div className="row">
          <div className="col-12 overlay-text">
            <h2>Use case</h2>
            <p className="p-tag mx-lg-5 mx-md-3 mx-sm-3 mx-2 px">
              Ideal for companies seeking faster, unbiased hiring, our AI
              interviewer streamlines candidate assessment, delivering real-time
              insights and simplifying talent selection.
            </p>
          </div>
          </div>
         
        </div>
      </section>
      <section >
        <div className="container-fluid px-lg-4 px-md-4 px-sm-4 px-0   py-lg-5 py-md-4 py-sm-3 py-2 mb-1 ">
          <div className="row">
            {cards_data.map((card, index) => (
              <div className="col-md-6 col-lg-4 mb-4 sm-screen " key={index}>
                <div className="card-wrapper">
                <div className="card-content">
                
                  <img
                    src={card.img}
                    alt="Responsive example"
                    className=" img-fluid card-img"
                  />

                  <div className="card-top-content mt-2 mx-3 mb-4">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-dec ">{card.description}</p>
                  </div>
                  <div className="mt-1 pb-4 mx-3">
                    <a href="#" className="white-btn ">
                      {card.button_text}
                    </a>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;

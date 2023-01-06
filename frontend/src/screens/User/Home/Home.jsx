import React from "react";
import logo from "../../../assets/sideimg.jpeg";
import money from "../../../assets/money.jpeg";
import "./Home.css";
import Aboutus from "../about/Aboutus";
const Home = () => {
  return (
    <>
      <div>
        <div className="mainbghomediv">
          <div className="home-right-text">
            <div>
              <h2>
                श्री दिगम्बर जैन सिद्धक्षेत्र
                <br />
                (कुण्डलपुर) कुण्डलगिरि
              </h2>
              <div className="linnes-outer-div">
                <div className="line-main-div">
                  <div className="line-1" />
                  <div className="line-2" />
                  <div className="line-1" />
                </div>

                <p>
                  भारतवर्ष का ह्रदय स्थल मध्य प्रदेश का एक जिला है “दमोह” I दमोह
                  <br />
                  (जिला मुख्यालय) से लगभग ३५ किलोमीटर दूर पटेरा तहसील में
                  <br />
                  बुन्देखण्ड का शिरर्मोर्य तीर्थ है I “कुंडलपुर” जो की
                  <br /> “कुण्डलगिरी” नामक अर्द्धचन्द्राकार पहाड़ियों पर स्थित है
                </p>
              </div>
              <div className="main-start-btn-div">
                <img src={money} alt="money" />
                <button className="donation-now-btn">Donate Now</button>
              </div>
            </div>
          </div>

          <div className="home-left-img">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <Aboutus />
    </>
  );
};

export default Home;

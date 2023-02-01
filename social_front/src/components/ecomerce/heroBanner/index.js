import React, {useState} from "react";
import { Link } from "react-router-dom";


const HeroBanner = ({ heroBanner }) => {
  console.log(heroBanner.smalltext);
  return(
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>MID TEXT</h3>
        <img src={process.env.BANNERIMG} alt="hero-banner-image" className="hero-banner-image"/>
        <div>
          <Link to='/product/:ID'>
            <button type='button'>BUTTON TEXT</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>DESCXRIPTION</p>
          </div>
        </div>
      </div>
    </div>
    )
}

export default HeroBanner

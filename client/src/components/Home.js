import React from 'react';
import './Home.css';


function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-intro">Hello, Welcome</p>
          <h1 className="hero-title">I'm Bramjot Singh</h1>
          <p className="hero-description">
           Focusing on crafting clean and efficient code,
           I’m building full-stack applications that balance functionality and user experience,
            with a mindset for continuous growth.
          </p>
          <a href="/contact" className="hero-button">Contact me</a>
        </div>
        <div className="hero-image-container">
          <img
            src="../images/Photograph.JPG"
            alt="Profile"
            className="hero-image"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../style/test.css"; // Make sure to include this file for other styles

import testImage from '../assets/test.png'; // Adjust the path as necessary

const Test = () => {
  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <nav className="navbar">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <Link to="/login" className="login-button">Login</Link>
        </nav>
      </header>
      
      {/* Home Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Real Estate Management</h1>
          <p>We are dedicated to providing the best real estate services in the industry.</p>
          <div className="buttons">
            <button className="join-button">Join Us</button>
            <button className="buy-property-button">Buy Property</button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <h2 style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%', 
        marginTop:'128px'
      }}>
        About Us
      </h2>

      <section id="about" className="about-us-container">
        <div className="about-us-image">
          <img src={testImage} alt="City view" />
        </div>
      </section>

      {/* Contact Section */}
      <h2 style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%', 
        marginTop:'128px'
      }}>Contact Us</h2>
      <section id="contact" className="contact-form-section">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Real Estate Management. All rights reserved.</p>
          <ul className="social-media">
            <li><a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://www.linkedin.com"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Test;

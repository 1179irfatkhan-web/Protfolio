import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiDownload } from 'react-icons/fi';
import { FaAward } from 'react-icons/fa';
import { personalInfo } from '../data';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="profile-section">
          <div className="profile-photo-container">
            <img 
              src={personalInfo.image || "profile.JPG"} 
              alt={personalInfo.name}
              className="profile-photo"
            />
            <div className="profile-badge">
              <FaAward />
              Available for Work
            </div>
          </div>

          <div className="profile-info">
            <h1>{personalInfo.name}</h1>
            <h2>{personalInfo.title}</h2>
            <p>{personalInfo.description}</p>

            <div className="contact-info">
              <div>
                <FiPhone />
                <span>{personalInfo.phone}</span>
              </div>
              <div>
                <FiMail />
                <span>{personalInfo.email}</span>
              </div>
              <div>
                <FiMapPin />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            <div className="hero-btns">
              <a href="#contact" className="btn">
                Get In Touch
              </a>
              <a 
                href={personalInfo.cvLink} 
                className="btn btn-outline"
                download
              >
                <FiDownload />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
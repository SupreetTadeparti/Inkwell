// src/App.js
import React from 'react';
import Nav from '../Components/Nav';
import SectionContent from '../Components/SectionContent';
import Tilt from 'react-parallax-tilt';
import img from "../assets/img/landingbg.png"
import { useState, useEffect } from 'react';
import { useParallax } from 'react-scroll-parallax';
import '../assets/css/Landing.css';

function Landing() {
  const [offsetY, setOffsetY] = useState(0);
  const { ref } = useParallax({ speed: 10, translateY: [-100, 100] });

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Nav />
      <div className="midground">
        <div className="balls" ref={ref}>
          <div className='ball'></div>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="green-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#BCEEEB', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#5378D9', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="green-teal" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#8FE74A', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#44E6B5', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="blue-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#E1EEBC', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#BCD9EE', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="10" cy="10" r="10" stroke="none" fill="url(#green-blue)" />
            <circle cx="40" cy="30" r="6" stroke="none" fill="url(#green-teal)" />
            <circle cx="30" cy="20" r="8" stroke="none" fill="url(#blue-blue)" />
          </svg>
        </div>
      </div>
      <main>
        <div className="background"><img id="background__gradient" src={img} alt="hello friends" /></div>
        <section className="home-section">
          <div className="note-sample glass">
            <div className="note-text">All your notes, in one place.</div>
          </div>
        </section>
        <section className="organize-section">
          <div className="four-notes">
            <div className="note"></div>
            <div className="note"></div>
            <div className="note"></div>
            <div className="note"></div>
          </div>
          <SectionContent heading="Sort categories with colors" content="Easily organize your notes based on colors to separate different topics. Lorem ipsum dolor sit amet." />
        </section>
        <section className="colors-section">
          <SectionContent heading="We value your Privacy and Security" content="We use the latest Blockchain technology to keep your data safe and secure. Lorem ipsum dolor sit amet." />
          <div className="colors-image-box"></div>
        </section>
      </main>
      <footer>
        <p>Copyright &copy; 2024 Inkwell, All Rights Reserved</p>
        <p>Contact Us at:<br />3743797594</p>
      </footer>
    </>
  );
}

export default Landing;



// src/App.js
import React from 'react';
import Nav from '../Components/Nav';
import SectionContent from '../Components/SectionContent';
import Lock from '../Components/Lock';
import img from "../assets/img/landingbg.png"
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from 'react';
import { useParallax } from 'react-scroll-parallax';
import '../assets/css/Landing.css';

function Landing() {
  const [_offsetY, setOffsetY] = useState(0);
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
              <linearGradient id="blue-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#BCEEEB', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#5378D9', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="green-teal" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#8FE74A', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#44E6B5', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="white-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#E1EEBC', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#BCD9EE', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="10" cy="10" r="10" stroke="none" fill="url(#blue-blue)" />
            <circle cx="40" cy="30" r="6" stroke="none" fill="url(#green-teal)" />
            <circle cx="70" cy="0" r="8" stroke="none" fill="url(#white-blue)" />
            <circle cx="60" cy="60" r="10" stroke="none" fill="url(#blue-blue)" />
            <circle cx="10" cy="50" r="4" stroke="none" fill="url(#blue-blue)" />
            <circle cx="80" cy="20" r="6" stroke="none" fill="url(#green-teal)" />
          </svg>
        </div>
      </div>
      <main>
        <div className="background"><img id="background__gradient" src={img} alt="hello friends" /></div>
        <section className="home-section">
          <div className="note-sample glass">
            <TypeAnimation sequence={[
              'All your notes, in one place.',
              3000,
              'All your memos, in one place.',
              3000,
              'All your docs, in one place.',
              3000
            ]} wrapper='div' repeat={Infinity} className='note-text' />
          </div>
        </section>
        <section className="content-section">
          <div className="four-notes glass">
            <div className="note"></div>
            <div className="note"></div>
            <div className="note"></div>
            <div className="note"></div>
          </div>
          <SectionContent heading="Sort categories with colors" content="Easily organize your notes based on colors to separate different topics. Lorem ipsum dolor sit amet." />
        </section>
        <section className="content-section">
          <SectionContent heading="We value your Privacy and Security" content="We use the latest Blockchain technology to keep your data safe and secure. Lorem ipsum dolor sit amet." />
          <div className="security-image glass"><Lock /></div>
        </section>
      </main>
      <footer className='glass'>
        <p>Copyright &copy; 2024 Inkwell, All Rights Reserved</p>
        <div className='contact'>Contact Us: <div className="contact__phone">+91 000-000-0001</div>
          <div className="contact__email">support@inkwell.com</div></div>
      </footer>
    </>
  );
}

export default Landing;



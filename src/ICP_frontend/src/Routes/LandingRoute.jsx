import React from 'react';
import Nav from '../Components/Nav';
import SectionContent from '../Components/SectionContent';
import Lock from '../Components/Lock';
import BallsBackground from '../Components/BallsBackground';
import img from "../assets/img/landingbg.png"
import { TypeAnimation } from 'react-type-animation';
import '../assets/css/LandingRoute.css';

function LandingRoute() {
  return (
    <div class="landing-page-container">
      <Nav />
      <BallsBackground />
      <main>
        <div className="background"><img id="background__gradient" src={img} alt="" /></div>
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
    </div>
  );
}

export default LandingRoute;



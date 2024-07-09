import React from "react";
import Nav from "../Components/Nav";
import SectionContent from "../Components/SectionContent";
import Lock from "../Components/Lock";
import BallsBackground from "../Components/BallsBackground";
import img from "../assets/img/landingbg.png";
import { TypeAnimation } from "react-type-animation";
import "../assets/css/LandingRoute.css";

function LandingRoute() {
  return (
    <div class="landing-page-container">
      <Nav />
      <BallsBackground />
      <main>
        <div className="background">
          <img id="background__gradient" src={img} alt="" />
        </div>
        <section className="home-section">
          <div className="note-sample glass">
            <TypeAnimation
              sequence={[
                "All your notes, in one place.",
                3000,
                "All your memos, in one place.",
                3000,
                "All your docs, in one place.",
                3000,
              ]}
              wrapper="div"
              repeat={Infinity}
              className="note-text"
            />
          </div>
        </section>
        <section className="content-section">
          <div className="four-notes">
            <div className="note"></div>
            <div className="note"></div>
            <div className="note"></div>
            <div className="note"></div>
          </div>
          <SectionContent
            heading="Organize with colors"
            content="Use color-based categories to separate topics. This helps with easy visual identification and organization. Assign a unique color to each category and keep all your notes sorted in one place. This approach enhances productivity and reduces the time spent searching for important details."
          />
        </section>
        <section className="content-section">
          <SectionContent
            heading="We value your Privacy and Security"
            content="We use the latest Blockchain technology to keep your data safe and secure. This ensures that your information is protected by a decentralized system, making unauthorized access impossible. No one else can access your notes, not even us."
          />
          <div className="security-image">
            <Lock />
          </div>
        </section>
      </main>
      <footer className="glass">
        <p>Copyright &copy; 2024 Inkwell, All Rights Reserved</p>
        <div className="contact">
          Contact Us: <div className="contact__phone">+91 000-000-0001</div>
          <div className="contact__email">support@inkwell.com</div>
        </div>
      </footer>
    </div>
  );
}

export default LandingRoute;

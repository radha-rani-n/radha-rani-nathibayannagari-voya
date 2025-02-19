import "./AboutCreator.scss";
import Radha from "../../assets/images/Radha-photo.jpg";
import { Github, Linkedin, Instagram } from "lucide-react";
const AboutCreator = () => {
  return (
    <section className="about">
      <img src={Radha} alt="Creator photo" className="about__img" />
      <div className="about__data">
        <h3 className="about__title">
          Welcome to Voya - Your Trip Planning Companion
        </h3>

        <p className="about__details">
          <b>Hi! I'm Radha Rani </b>, a passionate web developer and travel
          enthusiast. I created Voya to make planning trips easier, more
          organized, and more fun! Whether you're exploring new cities or
          rediscovering hidden gems, I believe every adventure should be stress
          free and enjoyable.
        </p>
        <div className="about__social">
          <a href="" className="about__social-icon">
            <Github />
          </a>
          <a href="" className="about__social-icon">
            <Instagram />
          </a>
          <a href="" className="about__social-icon">
            <Linkedin />
          </a>
        </div>
      </div>
    </section>
  );
};
export default AboutCreator;

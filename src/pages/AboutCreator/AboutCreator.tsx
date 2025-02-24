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
        <h4>Social</h4>
        <div className="about__social">
          <a
            href="https://github.com/radha-rani-n/"
            className="about__social-icon"
            target="_blank"
          >
            <Github />
          </a>
          <a
            href="https://www.instagram.com/"
            className="about__social-icon"
            target="_blank"
          >
            <Instagram />
          </a>
          <a
            href="https://www.linkedin.com/in/radha-rani-n/"
            className="about__social-icon"
            target="_blank"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </section>
  );
};
export default AboutCreator;

import "./AboutCreator.scss";
import Radha from "../../assets/images/Radha1.jpg";
const AboutCreator = () => {
  return (
    <section>
      <h3>Welcome to Voya - Your Trip Planning Companion</h3>
      <img src={Radha} alt="Creator photo" />
      <p>
        <b>Hi! I'm Radha Rani </b>, a passionate web developer and travel
        enthusiast. I created Voya to make planning trips easier, more
        organized, and more fun! Whether you're exploring new cities or
        rediscovering hidden gems, I believe every adventure should be stress
        free and enjoyable.
      </p>
    </section>
  );
};
export default AboutCreator;

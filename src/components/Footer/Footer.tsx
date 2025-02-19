import Travel from "../../assets/illustrations/Traveling-rafiki.svg";
import travelGirl from "../../assets/illustrations/Traveling-bro.svg";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__data">
        <h2 className="footer__title">Voya</h2>
        <ul className="footer__list">
          <li className="footer__list-item">About Creator</li>
          <li className="footer__list-item">Home</li>
          <li className="footer__list-item">Your Trips</li>
        </ul>
        <img
          src={Travel}
          alt="Travel Illustration"
          className="footer__illustration footer__illustration--1"
        />
        <img
          src={travelGirl}
          alt="Travel Illustration"
          className="footer__illustration footer__illustration--2"
        />
      </section>
    </footer>
  );
};
export default Footer;

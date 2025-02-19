import Travel from "../../assets/illustrations/Traveling-rafiki.svg";
import travelGirl from "../../assets/illustrations/Traveling-bro.svg";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import "./Footer.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="footer">
      <section className="footer__data">
        <h2 className="footer__title">Voya</h2>
        <ul className="footer__list">
          <li className="footer__list-item">About Creator</li>

          <li className="footer__list-item">
            <Link to="/" className="footer__list-item">
              Home{" "}
            </Link>
          </li>

          <li className="footer__list-item">
            <Link to="/your-trips" className="footer__list-item">
              Your Trips{" "}
            </Link>
          </li>
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
        <div className="footer__chat-widget">
          <button
            className="footer__chat-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            {" "}
            <MessageCircle size={24} />
          </button>

          {isOpen && (
            <div className="footer__chat-window">
              <div className="footer__chat-header">
                <h3>Voya Support</h3>
                <p>I'm Radha, creator of Voya:how can I help?</p>
              </div>
              <div className="footer__chat-form">
                <textarea
                  name=""
                  id=""
                  placeholder="Type your message..."
                  className="footer__chat-input"
                />
                <button
                  className="footer__chat-send"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Send size={20} className="footer__chat-send-icon" /> Send
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </footer>
  );
};
export default Footer;

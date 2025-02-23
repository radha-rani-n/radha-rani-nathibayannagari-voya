import "./Header.scss";
import Navigation from "../Navigation/Navigation";

import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { Button } from "antd";
import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`header ${isSticky ? "header--sticky" : ""}`}>
      <div className="header__data">
        <Link to="/" className="header__link">
          <Logo section="header" />
        </Link>

        <div className="header__nav">
          <Navigation />
          <div className="header__sign-in">
            <SignedOut>
              <SignInButton asChild>
                <button className="header__sign-in-btn">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

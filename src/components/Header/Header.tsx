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
      <Link to="/" className="header__link">
        <h1 className="header__title">
          <span className="header__title-1">V</span>
          <span className="header__title-2">o</span>
          <span className="header__title-3">y</span>
          <span className="header__title-4">a</span>
        </h1>
      </Link>
      <div className="header__nav">
        <Navigation />
        <div>
          <SignedOut>
            <SignInButton asChild>
              <Button type="primary">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
export default Header;

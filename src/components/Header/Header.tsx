import "./Header.scss";
import Navigation from "../Navigation/Navigation";
import voya from "../../assets/images/voya.svg";
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
        {/* <Link to="/" className="header__link"> */}
        <Logo />
        {/* </Link> */}

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
      </div>
    </header>
  );
};
export default Header;

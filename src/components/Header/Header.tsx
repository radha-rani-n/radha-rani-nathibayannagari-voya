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

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <h1 className="header__title">
          <span className="header__title-1">V</span>
          <span className="header__title-2">o</span>
          <span className="header__title-3">y</span>
          <span className="header__title-4">a</span>
        </h1>
      </Link>
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
    </header>
  );
};
export default Header;

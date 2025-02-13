import "./Header.scss";
import Navigation from "../Navigation/Navigation";
const Header = () => {
  return (
    <div className="header">
      <h1 className="header__title">Voya</h1>
      <Navigation />
    </div>
  );
};
export default Header;

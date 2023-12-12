import { Link } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <header className="bg-dark text-white">
      <nav className="navbar d-flex align-items-center justify-content-between w-75 m-auto">
        <Link to="/" className="navbar-brand text-white">Logo</Link>
        <HeaderCartButton />
      </nav >
    </header >
  );
};

export default Header;

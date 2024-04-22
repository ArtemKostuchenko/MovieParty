import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container hdr">
      <div className="wrapper">
        <header className="header">
          <div className="header__logo logo">
            <Link className="icon logo" to="/"></Link>
          </div>
          <div className="header__login">
            <Link className="button primary" to="/login">
              Увійти
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;

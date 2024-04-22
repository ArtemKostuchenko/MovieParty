import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="container hdr">
      <div className="wrapper">
        <header className="header">
          <div className="header__logo logo">
            <div className="icon logo"></div>
          </div>
          <div className="header__login">
            <button className="button primary">Увійти</button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;

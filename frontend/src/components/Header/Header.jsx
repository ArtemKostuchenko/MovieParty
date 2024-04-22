import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div class="container hdr">
      <div class="wrapper">
        <header class="header">
          <div class="header__logo logo">
            <div class="icon logo"></div>
          </div>
          <div class="header__login">
            <button class="button primary">Увійти</button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;

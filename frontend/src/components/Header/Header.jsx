import React from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Avatar from "../../assets/avatar.png";
import "./style.component.scss";

const Header = () => {
  const { isAuth } = useUser();

  return (
    <div className="container hdr">
      <div className="wrapper">
        <header className="header">
          <div className="header__logo logo">
            <Link className="icon logo" to="/"></Link>
          </div>
          {isAuth ? (
            <>
              <div className="header__menu">
                <div className="menu">
                  <ul className="menu__items">
                    <li className="menu__item">
                      <a href="#">
                        <div className="icon diamond"></div>
                        <h5 className="menu__title">Підбірки</h5>
                      </a>
                    </li>
                    <li className="menu__item">
                      <a href="#">
                        <div className="icon saved"></div>
                        <h5 className="menu__title">Збережене</h5>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header__search">
                <div className="search">
                  <div className="icon find"></div>
                  <div className="search__input">
                    <label htmlFor="search">
                      <span>Пошук </span>
                      <span className="search__input-query">
                        фільмів, серіалів тощо...
                      </span>
                    </label>
                    <input
                      type="text"
                      className="search__input"
                      name="search"
                    />
                  </div>
                </div>
              </div>
              <div className="header__profile">
                <div className="profile">
                  <div className="profile__avatar">
                    <img src={Avatar} alt="Qwerty" />
                  </div>
                </div>
              </div>
              <button className="menu-burger">
                <div className="icon menu-burger"></div>
              </button>
            </>
          ) : (
            <div className="header__login">
              <Link className="button primary" to="/login">
                Увійти
              </Link>
            </div>
          )}
        </header>
      </div>
    </div>
  );
};

export default Header;

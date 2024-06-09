import React from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useSideMenu from "../../hooks/useSideMenu";
import "./style.component.scss";
import Avatar from "../Avatar/Avatar";

const Header = () => {
  const { isAuth, user } = useUser();
  const { isSideMenuOpen, toggleSideMenu } = useSideMenu();

  return (
    <div className="container hdr">
      <div className="wrapper">
        <header className="header">
          <div className="header__logo logo">
            <Link
              className="icon logo"
              to="/"
              onClick={isSideMenuOpen ? toggleSideMenu : undefined}
            ></Link>
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
                      <Link to="/profile/favorite">
                        <div className="icon saved"></div>
                        <h5 className="menu__title">Збережене</h5>
                      </Link>
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
                <Link to="/profile">
                  <div className="profile">
                    <div className="profile__avatar">
                      <Avatar
                        photoURL={user.avatarURL}
                        nickname={user.nickname}
                        avatarColor={user.avatarColor}
                      />
                    </div>
                  </div>
                </Link>
              </div>
              <button className="menu-burger" onClick={toggleSideMenu}>
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

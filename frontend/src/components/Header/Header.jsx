import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../../hooks/useUser";
import useSideMenu from "../../hooks/useSideMenu";
import "./style.component.scss";
import Avatar from "../Avatar/Avatar";
import Search from "../Search/Search";
import { setVisibleState } from "../../features/store/slices/search";

const Header = () => {
  const { isAuth, user } = useUser();
  const dispatch = useDispatch();
  const { isVisible } = useSelector((store) => store.search);
  const { isSideMenuOpen, toggleSideMenu } = useSideMenu();

  const handleOpenSideMenu = () => {
    if (!isSideMenuOpen && isVisible) dispatch(setVisibleState(false));
    toggleSideMenu();
  };

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
                      <Link to="/selections">
                        <div className="icon diamond"></div>
                        <h5 className="menu__title">Підбірки</h5>
                      </Link>
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
              <Search />
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
              <button className="menu-burger" onClick={handleOpenSideMenu}>
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

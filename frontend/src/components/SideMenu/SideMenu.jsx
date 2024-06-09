import React from "react";
import useSideMenu from "../../hooks/useSideMenu";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const { isSideMenuOpen, toggleSideMenu } = useSideMenu();
  const { user } = useUser();
  return (
    <aside className={`side-nav${isSideMenuOpen ? " side-nav-open" : ""}`}>
      <section className="side-nav__content">
        <Link
          className="side-nav__profile"
          to="/profile"
          onClick={toggleSideMenu}
        >
          <div className="side-nav__avatar">
            {user && (
              <Avatar
                nickname={user.nickname}
                photoURL={user.avatarURL}
                avatarColor={user.avatarColor}
              />
            )}
          </div>
          <div className="side-nav__username">{user?.nickname}</div>
        </Link>
        <div className="side-nav__menu">
          <nav className="nav-menu">
            <div className="nav-menu__items">
              <Link
                className="nav-menu__item"
                to="/profile"
                onClick={toggleSideMenu}
              >
                <div className="nav-menu__icon">
                  <div className="icon user"></div>
                </div>
                <div className="nav-menu__title">Профіль</div>
              </Link>
              <Link
                className="nav-menu__item"
                to="/selections"
                onClick={toggleSideMenu}
              >
                <div className="nav-menu__icon">
                  <div className="icon diamond"></div>
                </div>
                <div className="nav-menu__title">Підбірки</div>
              </Link>
              <Link
                className="nav-menu__item"
                to="/profile/favorite"
                onClick={toggleSideMenu}
              >
                <div className="nav-menu__icon">
                  <div className="icon saved"></div>
                </div>
                <div className="nav-menu__title">Збережене</div>
              </Link>
            </div>
          </nav>
        </div>
      </section>
    </aside>
  );
};

export default SideMenu;

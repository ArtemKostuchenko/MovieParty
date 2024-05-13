import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Avatar from "../assets/avatar.png";

const ProfileLayout = () => {
  return (
    <div className="container cnt-mn">
      <div className="container">
        <div className="wrapper">
          <div className="profile-user">
            <div className="profile-user-side">
              <div className="profile-user-info">
                <div className="profile-user-details">
                  <div className="profile-user-avatar">
                    <img src={Avatar} alt="Qwerty" />
                  </div>
                  <div className="profile-user-nickname">Qwerty</div>
                  <div className="profile-user-email">qwerty@gmail.com</div>
                </div>
                <div className="icon profile-menu" />
              </div>
              <div className="profile-user-menu">
                <div className="profile-menu">
                  <div className="profile-menu-items">
                    <NavLink to="" className="profile-menu-item" end>
                      <div className="profile-menu-item-icon">
                        <div className="icon user" />
                      </div>
                      <div className="profile-menu-item-title">Профіль</div>
                    </NavLink>
                    <NavLink to="comments" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon comment" />
                      </div>
                      <div className="profile-menu-item-title">
                        Мої коментарі
                      </div>
                    </NavLink>
                    <NavLink to="favorite" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon saved" />
                      </div>
                      <div className="profile-menu-item-title">Збережене</div>
                    </NavLink>
                    <NavLink to="personal-data" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon lock" />
                      </div>
                      <div className="profile-menu-item-title">
                        Персональні дані
                      </div>
                    </NavLink>
                    <NavLink to="password" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon key" />
                      </div>
                      <div className="profile-menu-item-title">Пароль</div>
                    </NavLink>
                    <NavLink to="subscribe" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon present" />
                      </div>
                      <div className="profile-menu-item-title">Підписка</div>
                    </NavLink>
                    <a href="#" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon exit" />
                      </div>
                      <div className="profile-menu-item-title">Вийти</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-user-content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default ProfileLayout;

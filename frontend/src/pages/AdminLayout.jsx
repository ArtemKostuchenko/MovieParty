import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Avatar from "../assets/avatar.png";

const AdminLayout = () => {
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
                  <div className="profile-user-nickname">
                    Qwerty (<span className="profile-user-role">Admin</span>)
                  </div>
                </div>
                <div className="icon profile-menu" />
              </div>
              <div className="profile-user-menu">
                <div className="profile-menu">
                  <div className="profile-menu-items">
                    <NavLink to="type-content" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon layers" />
                      </div>
                      <div className="profile-menu-item-title">
                        Тип контенту
                      </div>
                    </NavLink>
                    <NavLink to="countries" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon earth" />
                      </div>
                      <div className="profile-menu-item-title">Країни</div>
                    </NavLink>
                    <NavLink to="genres" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon genre" />
                      </div>
                      <div className="profile-menu-item-title">Жанри</div>
                    </NavLink>
                    <NavLink to="best-lists" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon best-list" />
                      </div>
                      <div className="profile-menu-item-title">Списки</div>
                    </NavLink>
                    <NavLink to="parts" className="profile-menu-item">
                      <div className="profile-menu-item-icon">
                        <div className="icon parts" />
                      </div>
                      <div className="profile-menu-item-title">Частини</div>
                    </NavLink>
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

export default AdminLayout;

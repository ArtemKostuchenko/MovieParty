import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar } from "../components";
import useUser from "../hooks/useUser";
import useSideMenu from "../hooks/useSideMenu";

const AdminLayout = () => {
  const { user, updateMe, refetchUser, logoutUser } = useUser();
  const { isProfileMenuOpen, isTabletOrMobileProfile, toggleProfileMenu } =
    useSideMenu();

  return (
    <div className="container cnt-mn">
      <div className="container">
        <div className="wrapper">
          <div className="profile-user">
            <div className="profile-user-side">
              <div className="profile-user-info">
                {!user && (
                  <div className="profile-user-details">
                    <div className="profile-user-avatar loader-skeleton profile-avatar"></div>
                    <div className="profile-user-nickname loader-skeleton profile-nickname"></div>
                    <div className="profile-user-email loader-skeleton profile-email"></div>
                  </div>
                )}
                {user && (
                  <div className="profile-user-details">
                    <div className="profile-user-avatar">
                      <Avatar
                        photoURL={user.avatarURL}
                        nickname={user.nickname}
                        avatarColor={user.avatarColor}
                        height={isTabletOrMobileProfile ? 75 : 120}
                        width={isTabletOrMobileProfile ? 75 : 120}
                        fontSize={24}
                      />
                    </div>
                    <div className="profile-user-nickname">
                      {user.nickname} (
                      <span className="profile-user-role">Admin</span>)
                    </div>
                  </div>
                )}
                <div
                  className="icon profile-menu"
                  onClick={toggleProfileMenu}
                />
              </div>
              <div className="profile-user-menu">
                {isTabletOrMobileProfile && (
                  <>
                    <motion.div
                      className="profile-menu"
                      initial={false}
                      animate={isProfileMenuOpen ? "open" : "closed"}
                      variants={{
                        open: {
                          opacity: 1,
                          height: "auto",
                          visibility: "visible",
                          transition: {
                            duration: 0.2,
                          },
                        },
                        closed: {
                          opacity: 0,
                          height: 0,
                          visibility: "hidden",
                          transition: {
                            duration: 0.2,
                          },
                        },
                      }}
                    >
                      <div className="profile-menu-items">
                        <NavLink
                          to="video-content"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon video-content" />
                          </div>
                          <div className="profile-menu-item-title">
                            Відеоконтент
                          </div>
                        </NavLink>
                        <NavLink
                          to="type-content"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon layers" />
                          </div>
                          <div className="profile-menu-item-title">
                            Тип контенту
                          </div>
                        </NavLink>
                        <NavLink
                          to="countries"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon earth" />
                          </div>
                          <div className="profile-menu-item-title">Країни</div>
                        </NavLink>
                        <NavLink
                          to="genres"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon genre" />
                          </div>
                          <div className="profile-menu-item-title">Жанри</div>
                        </NavLink>
                        <NavLink
                          to="best-lists"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon best-list" />
                          </div>
                          <div className="profile-menu-item-title">Списки</div>
                        </NavLink>
                        <NavLink
                          to="parts"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon ps" />
                          </div>
                          <div className="profile-menu-item-title">Частини</div>
                        </NavLink>
                        <NavLink
                          to="actors"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon actors" />
                          </div>
                          <div className="profile-menu-item-title">Актори</div>
                        </NavLink>
                        <NavLink
                          to="directors"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon directors" />
                          </div>
                          <div className="profile-menu-item-title">
                            Режисери
                          </div>
                        </NavLink>
                        <NavLink
                          to="selections"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon slct" />
                          </div>
                          <div className="profile-menu-item-title">
                            Підбірки
                          </div>
                        </NavLink>
                      </div>
                    </motion.div>
                  </>
                )}
                {!isTabletOrMobileProfile && (
                  <div className="profile-menu">
                    <div className="profile-menu-items">
                      <NavLink to="video-content" className="profile-menu-item">
                        <div className="profile-menu-item-icon">
                          <div className="icon video-content" />
                        </div>
                        <div className="profile-menu-item-title">
                          Відеоконтент
                        </div>
                      </NavLink>
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
                          <div className="icon ps" />
                        </div>
                        <div className="profile-menu-item-title">Частини</div>
                      </NavLink>
                      <NavLink to="actors" className="profile-menu-item">
                        <div className="profile-menu-item-icon">
                          <div className="icon actors" />
                        </div>
                        <div className="profile-menu-item-title">Актори</div>
                      </NavLink>
                      <NavLink to="directors" className="profile-menu-item">
                        <div className="profile-menu-item-icon">
                          <div className="icon directors" />
                        </div>
                        <div className="profile-menu-item-title">Режисери</div>
                      </NavLink>
                      <NavLink to="selections" className="profile-menu-item">
                        <div className="profile-menu-item-icon">
                          <div className="icon slct" />
                        </div>
                        <div className="profile-menu-item-title">Підбірки</div>
                      </NavLink>
                    </div>
                  </div>
                )}
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

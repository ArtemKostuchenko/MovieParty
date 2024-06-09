import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar } from "../components";
import useUser from "../hooks/useUser";
import useSideMenu from "../hooks/useSideMenu";

const ProfileLayout = () => {
  const { user, updateMe, refetchUser, logoutUser } = useUser();
  const { isProfileMenuOpen, isTabletOrMobileProfile, toggleProfileMenu } =
    useSideMenu();

  const handlePhotoUpdate = async (file) => {
    const res = await updateMe({
      avatarURL: file,
    });
    await refetchUser();
    console.log(res);
  };

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
                        updatable
                        handlePhotoUpdate={handlePhotoUpdate}
                      />
                    </div>
                    <div className="profile-user-nickname">{user.nickname}</div>
                    <div className="profile-user-email">{user.email}</div>
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
                          transition: {
                            duration: 0.2,
                          },
                        },
                        closed: {
                          opacity: 0,
                          height: 0,
                          transition: {
                            duration: 0.2,
                          },
                        },
                      }}
                    >
                      <div className="profile-menu-items">
                        <NavLink
                          to=""
                          className="profile-menu-item"
                          end
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon user" />
                          </div>
                          <div className="profile-menu-item-title">Профіль</div>
                        </NavLink>
                        <NavLink
                          to="comments"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon comment" />
                          </div>
                          <div className="profile-menu-item-title">
                            Мої коментарі
                          </div>
                        </NavLink>
                        <NavLink
                          to="favorite"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon saved" />
                          </div>
                          <div className="profile-menu-item-title">
                            Збережене
                          </div>
                        </NavLink>
                        <NavLink
                          to="personal-data"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon lock" />
                          </div>
                          <div className="profile-menu-item-title">
                            Персональні дані
                          </div>
                        </NavLink>
                        <NavLink
                          to="password"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon key" />
                          </div>
                          <div className="profile-menu-item-title">Пароль</div>
                        </NavLink>
                        <NavLink
                          to="subscribe"
                          className="profile-menu-item"
                          onClick={toggleProfileMenu}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon present" />
                          </div>
                          <div className="profile-menu-item-title">
                            Підписка
                          </div>
                        </NavLink>
                        <button
                          className="profile-menu-item"
                          onClick={() => {
                            toggleProfileMenu();
                            logoutUser();
                          }}
                        >
                          <div className="profile-menu-item-icon">
                            <div className="icon exit" />
                          </div>
                          <div className="profile-menu-item-title">Вийти</div>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
                {!isTabletOrMobileProfile && (
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
                      <button
                        className="profile-menu-item"
                        onClick={logoutUser}
                      >
                        <div className="profile-menu-item-icon">
                          <div className="icon exit" />
                        </div>
                        <div className="profile-menu-item-title">Вийти</div>
                      </button>
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

export default ProfileLayout;

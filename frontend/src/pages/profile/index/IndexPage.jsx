import React from "react";
import "./style.page.scss";
import { useGetMyInfoQuery } from "../../../features/services/users/usersService";
import { useGetBestReviewsByUserIdQuery } from "../../../features/services/reviews/reviewsService";
import { getRelativeTime } from "../../../features/utils/functions";
import useUser from "../../../hooks/useUser";
import CommentItems from "../../../components/Comments/CommentItems";

const IndexPage = () => {
  const { user: userCredentials } = useUser();
  const { data: user, isLoading } = useGetMyInfoQuery();

  return (
    <>
      <div className="profile-user-content-title">Профіль</div>
      <div className="profile-user-content-container">
        <div className="profile-user-content-container-title">
          Загальна інформація
        </div>
        <div className="user-info">
          {isLoading && (
            <div className="user-info-items">
              <div className="user-info-item">
                <div className="user-info-title">Нікнейм</div>
                <div className="loader-skeleton info-desc"></div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Країна</div>
                <div className="loader-skeleton info-desc"></div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Останній вхід</div>
                <div className="loader-skeleton info-desc"></div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Зареєстрований</div>
                <div className="loader-skeleton info-desc"></div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Збереженого контенту</div>
                <div className="loader-skeleton info-desc"></div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Переглянутого контенту</div>
                <div className="loader-skeleton info-desc"></div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Створено вечірок</div>
                <div className="loader-skeleton info-desc"></div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Відвідано вечірок</div>
                <div className="loader-skeleton info-desc"></div>
              </div>
            </div>
          )}
          {!isLoading && (
            <div className="user-info-items">
              <div className="user-info-item">
                <div className="user-info-title">Нікнейм</div>
                <div className="user-info-desc">{user.nickname}</div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Країна</div>
                <div className="user-info-desc">
                  {user.country && (
                    <img
                      src={`${
                        import.meta.env.VITE_BACK_HOST
                      }/static/files/crs/${user.country.icon}`}
                      className="country-icon"
                      alt="США"
                    />
                  )}
                  {user.country ? user.country.name : "Невідомо"}
                </div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Останній вхід</div>
                <div className="user-info-desc">
                  {getRelativeTime(new Date(user.lastLogin))}
                </div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Зареєстрований</div>
                <div className="user-info-desc">
                  {getRelativeTime(new Date(user.createdAt))}
                </div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Збереженого контенту</div>
                <div className="user-info-desc">{user.favorites.length}</div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Переглянутого контенту</div>
                <div className="user-info-desc">0 хв</div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Створено вечірок</div>
                <div className="user-info-desc">0</div>
              </div>
              <div className="user-info-item">
                <div className="user-info-title">Відвідано вечірок</div>
                <div className="user-info-desc">0</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="profile-user-content-container">
        <div className="profile-user-content-container-title">
          Популярні коментарі
        </div>
        {!isLoading && user && (
          <div className="user-comments">
            <CommentItems
              userId={user._id}
              query={useGetBestReviewsByUserIdQuery}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default IndexPage;

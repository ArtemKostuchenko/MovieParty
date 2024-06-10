import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.page.scss";
import { Loader, NotFound } from "../../../components";
import useSubscription from "../../../hooks/useSubscription";
import { formatDate, formatTime } from "../../../features/utils/functions";

const SubscribePage = () => {
  const { subscription, isLoading, cancelSubscription, isLoadingCancel } =
    useSubscription();
  const navigate = useNavigate();

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription(subscription.id);
      toast.info("Підписку скасовано");
    } catch (_) {
      toast.error("Помилка скасування підписки");
    }
  };

  return (
    <>
      <div className="profile-user-content-title">Підписка</div>
      <div className="profile-user-content-container">
        {isLoading && <Loader fill />}
        {!isLoading && subscription && (
          <>
            <div className="profile-user-content-container-title">
              Поточна підписка
            </div>
            <div className="user-subscribe">
              <div className="user-subscribe-active starter">
                <div className="user-subscribe-name">Starter Plan</div>
                {subscription.status === "active" && (
                  <div className="user-subscribe-bill">
                    Наступний період оплати:
                    <span className="user-subscribe-expires">
                      {formatDate(
                        new Date(subscription.current_period_end * 1000)
                      )}{" "}
                      {formatTime(
                        new Date(subscription.current_period_end * 1000)
                      )}
                    </span>
                  </div>
                )}
                {subscription.status === "canceled" && (
                  <div className="user-subscribe-bill cl">
                    <div>
                      Скасована:
                      <span className="user-subscribe-expires">
                        {formatDate(new Date(subscription.canceled_at * 1000))}{" "}
                        {formatTime(new Date(subscription.canceled_at * 1000))}
                      </span>
                    </div>
                    <div>
                      Дійсна до:
                      <span className="user-subscribe-expires">
                        {formatDate(
                          new Date(subscription.current_period_end * 1000)
                        )}{" "}
                        {formatTime(
                          new Date(subscription.current_period_end * 1000)
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="user-subscribe-splitter" />
              <div className="user-subscribe-title">Особливості / Переваги</div>
              <div className="user-subscribe-benefits">
                <div className="user-subscribe-item">
                  <div className="icon success" />
                  <div className="user-subscribe-item-title">Якість 1080p</div>
                </div>
                <div className="user-subscribe-item">
                  <div className="icon success" />
                  <div className="user-subscribe-item-title">
                    Необмежена бібліотека контенту
                  </div>
                </div>
                <div className="user-subscribe-item">
                  <div className="icon success" />
                  <div className="user-subscribe-item-title">
                    Спільний перегляд контенту
                  </div>
                </div>
                <div className="user-subscribe-item">
                  <div className="icon success" />
                  <div className="user-subscribe-item-title">
                    Доступ на будь-якому пристрої
                  </div>
                </div>
                <div className="user-subscribe-item">
                  <div className="icon success" />
                  <div className="user-subscribe-item-title">
                    Оновлення плану у будь-який час
                  </div>
                </div>
              </div>
              <div className="user-subscribe-ad">
                <div className="user-subscribe-price">4.99 USD / місяць</div>
                <div className="user-subscribe-actions">
                  {subscription.status === "active" && (
                    <>
                      <button className="button success">Змінити</button>
                      <button
                        className="button primary"
                        disabled={isLoadingCancel}
                        onClick={handleCancelSubscription}
                      >
                        Скасувати
                      </button>
                    </>
                  )}
                  {subscription.status === "canceled" && (
                    <>
                      <button className="button additional">Поновити</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {!isLoading && !subscription && (
          <>
            <NotFound
              title="Немає жодної активної підписки"
              description="Натисніть кнопку нижче, щоб оформити підписку"
              splitter={false}
              height={350}
            />
            <button
              className="button primary"
              onClick={() => navigate("/subscribe")}
            >
              Оформити підписку
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SubscribePage;

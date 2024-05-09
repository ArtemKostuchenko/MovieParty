import React from "react";
import "./style.page.scss";

const SubscribePage = () => {
  return (
    <>
      <div className="profile-user-content-title">Підписка</div>
      <div className="profile-user-content-container">
        <div className="profile-user-content-container-title">
          Поточна підписка
        </div>
        <div className="user-subscribe">
          <div className="user-subscribe-active starter">
            <div className="user-subscribe-name">Starter Plan</div>
            <div className="user-subscribe-bill">
              Наступний період оплати:
              <span className="user-subscribe-expires">08 Бер 2024 15:38</span>
            </div>
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
                Необмежена біліотека контенту
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
                Доступ на будь-якому девайсі
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
              <button className="button success">Змінити</button>
              <button className="button primary">Скасувати</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribePage;

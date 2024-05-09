import React from "react";
import "./style.page.scss";

const PasswordPage = () => {
  return (
    <>
      <div className="flex r sb ch">
        <div className="profile-user-content-title">Пароль</div>
        <button className="button primary" disabled="">
          Зберегти
        </button>
      </div>
      <div className="profile-user-content-container">
        <div className="password">
          <div className="password-items">
            <div className="password-item">
              <div className="password-title">Поточний пароль</div>
              <input
                type="password"
                className="form__input linear"
                defaultValue="qwerty"
              />
            </div>
            <div className="password-item">
              <div className="password-title">Новий пароль</div>
              <input
                type="password"
                className="form__input linear"
                defaultValue="qwerty"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordPage;

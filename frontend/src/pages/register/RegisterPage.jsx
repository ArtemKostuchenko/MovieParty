import React from "react";
import "./style.page.css";
import MainBackground from "../../assets/main-background.png";

const RegisterPage = () => {
  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <div className="container">
        <div className="grid__main">
          <div className="grid__form">
            <div className="container full">
              <div className="wrapper flex center">
                <div className="login__form">
                  <form className="form">
                    <div className="form__title">Реєстрація</div>
                    <div className="form__description">
                      Вітаємо на нашому веб-сервісі
                    </div>
                    <div className="form__items">
                      <div className="form__item">
                        <input
                          type="email"
                          className="input"
                          name="email"
                          placeholder="Електронна пошта"
                        />
                      </div>
                      <div className="form__item">
                        <input
                          type="email"
                          className="input"
                          name="nickname"
                          placeholder="Нікнейм"
                        />
                      </div>
                      <div className="form__item">
                        <div className="input__icon">
                          <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                          />
                          <div className="icon eye hidden"></div>
                        </div>
                      </div>
                      <div className="form__item">
                        <div className="input__icon">
                          <input
                            type="password"
                            name="password"
                            placeholder="Повторіть пароль"
                          />
                          <div className="icon eye hidden"></div>
                        </div>
                      </div>
                      <div className="form__item">
                        <button type="submit" className="button primary fill">
                          Зареєструватися
                        </button>
                      </div>
                      <div className="form__item">
                        <div className="form__text flex row g-5 center">
                          <span>Вже зареєстровані?</span>
                          <a href="#">Увійти</a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="grid__background">
            <img src={MainBackground} alt="MainImage" />
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default RegisterPage;

import React from "react";
import MainBackground from "../../assets/main-background.png";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../features/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const { isLoading, error, registerUser } = useUser();

  const onSubmitHandler = (data) => {
    const { email, nickname, password } = data;
    registerUser(email, nickname, password);
  };

  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <div className="container">
        <div className="grid__main">
          <div className="grid__form">
            <div className="container h100">
              <div className="form wrapper h100 flex center">
                <div className="form__wrapper">
                  <form
                    className="form"
                    onSubmit={handleSubmit(onSubmitHandler)}
                  >
                    <div className="form__title">Реєстрація</div>
                    <div className="form__description">
                      Вітаємо на нашому веб-сервісі
                    </div>
                    <div className="form__items">
                      <div className="form__item">
                        <input
                          {...register("email")}
                          type="email"
                          className="form__input"
                          placeholder="Електронна пошта"
                          required
                        />
                        <span className="message error">
                          {errors.email?.message}
                        </span>
                      </div>
                      <div className="form__item">
                        <input
                          {...register("nickname")}
                          type="text"
                          className="form__input"
                          placeholder="Нікнейм"
                          required
                        />
                        <span className="message error">
                          {errors.nickname?.message}
                        </span>
                      </div>
                      <div className="form__item">
                        <div className="form__input__icon">
                          <input
                            {...register("password")}
                            type="password"
                            placeholder="Пароль"
                            required
                          />
                          <div className="icon eye hidden"></div>
                        </div>
                        <span className="message error">
                          {errors.password?.message}
                        </span>
                      </div>
                      <div className="form__item">
                        <div className="form__input__icon">
                          <input
                            {...register("password2")}
                            type="password"
                            placeholder="Повторіть пароль"
                            required
                          />
                          <div className="icon eye hidden"></div>
                        </div>
                        <span className="message error">
                          {errors.password2?.message}
                        </span>
                      </div>
                      <div className="form__item">
                        <button
                          type="submit"
                          className="button primary fill"
                          disabled={isLoading}
                        >
                          Зареєструватися
                        </button>
                        <span className="message error center">
                          {error.register
                            ? "Неможливо зареєструватися, спробуйте знову"
                            : ""}
                        </span>
                      </div>
                      <div className="form__item">
                        <div className="form__text flex row g-5 center">
                          <span>Вже зареєстровані?</span>
                          <Link to="/login">Увійти</Link>
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

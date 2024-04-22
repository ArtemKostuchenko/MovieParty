import React, { useEffect } from "react";
import "./style.page.css";
import MainBackground from "../../assets/main-background.png";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../features/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const { isLoading, error, isAuth, registerUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const onSubmitHandler = (data) => {
    const { email, nickname, password } = data;
    registerUser(email, nickname, password);
  };

  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <div className="container">
        <div className="grid__main">
          <div className="grid__form">
            <div className="container full">
              <div className="wrapper flex center">
                <div className="login__form">
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
                          className="input"
                          placeholder="Електронна пошта"
                          required
                        />
                        <span className="error__message">
                          {errors.email?.message}
                        </span>
                      </div>
                      <div className="form__item">
                        <input
                          {...register("nickname")}
                          type="text"
                          className="input"
                          placeholder="Нікнейм"
                          required
                        />
                        <span className="error__message">
                          {errors.nickname?.message}
                        </span>
                      </div>
                      <div className="form__item">
                        <div className="input__icon">
                          <input
                            {...register("password")}
                            type="password"
                            placeholder="Пароль"
                            required
                          />
                          <div className="icon eye hidden"></div>
                        </div>
                        <span className="error__message">
                          {errors.password?.message}
                        </span>
                      </div>
                      <div className="form__item">
                        <div className="input__icon">
                          <input
                            {...register("password2")}
                            type="password"
                            placeholder="Повторіть пароль"
                            required
                          />
                          <div className="icon eye hidden"></div>
                        </div>
                        <span className="error__message">
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
                        <span className="error__message center">
                          {error
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

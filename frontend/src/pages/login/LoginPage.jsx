import React from "react";
import MainBackground from "../../assets/main-background.png";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../features/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const { isLoading, error, loginUser } = useUser();

  const onSubmitHandler = (data) => {
    const { email, password } = data;
    loginUser(email, password);
  };

  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <div className="container">
        <div className="grid__main">
          <div className="grid__form">
            <div className="container h100">
              <div className="form wrapper h100 flex center">
                <div className="form__wrapper">
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="form__title">Вхід</div>
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
                        <div className="form__input__icon">
                          <input
                            {...register("password")}
                            type="password"
                            placeholder="Пароль"
                            required
                            autoComplete="true"
                          />
                          <div className="icon eye hidden"></div>
                        </div>
                        <span className="message error">
                          {errors.password?.message}
                        </span>
                      </div>
                      <div className="form__item">
                        <button
                          type="submit"
                          className="button primary fill"
                          disabled={isLoading}
                        >
                          Увійти
                        </button>
                        <span className="message error center">
                          {error.login
                            ? "Неправильна електронна пошта або пароль"
                            : ""}
                        </span>
                      </div>
                      <div className="form__item">
                        <div className="form__text">
                          Вхід через соціальні мережі
                        </div>
                      </div>
                      <div className="form__item">
                        <a className="button gray icon fill" href="#">
                          <div className="icon google"></div>
                          Google
                        </a>
                      </div>
                      <div className="form__item">
                        <div className="form__text flex row center">
                          <a href="#">Забули пароль?</a>
                        </div>
                      </div>
                      <div className="form__item">
                        <div className="form__text flex row g-5 center">
                          <span>Уперше на MovieParty?</span>
                          <Link to="/register">Зареєструватися</Link>
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

export default LoginPage;

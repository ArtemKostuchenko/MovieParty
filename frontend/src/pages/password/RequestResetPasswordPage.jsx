import React from "react";
import { Link } from "react-router-dom";
import MainBackground from "../../assets/main-background.png";
import { useForm } from "react-hook-form";

const RequestResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm();

  const onSubmitHandler = (data) => {};
  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <div className="container">
        <div className="grid__main">
          <div className="grid__form">
            <div className="container h100">
              <div className="form wrapper h100 flex center">
                <div className="form__wrapper">
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="form__title">Відновлення паролю</div>
                    <div className="form__items">
                      <div className="form__item">
                        <input
                          {...register("email")}
                          type="email"
                          className="form__input"
                          placeholder="Електронна пошта"
                          required
                        />
                      </div>
                      <div className="form__item">
                        <button
                          type="submit"
                          className="button primary fill"
                          disabled={!isDirty || !isValid}
                        >
                          Відновити
                        </button>
                      </div>
                      <div className="form__item">
                        <div className="form__text flex row g-5 center">
                          <span>Згадали пароль?</span>
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

export default RequestResetPasswordPage;

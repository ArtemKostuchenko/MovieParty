import React, { useState } from "react";
import "./style.page.scss";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MainBackground from "../../assets/main-background.png";
import useUser from "../../hooks/useUser";
import SendResetPasswordPage from "./SendResetPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";

const RequestResetPasswordPage = () => {
  const { requestToResetPassword, isLoadingReset } = useUser();
  const [isSuccessReset, setIsSuccessReset] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm();

  const onSubmitHandler = async (data) => {
    try {
      await requestToResetPassword(data.email);
      setIsSuccessReset(true);
      toast.success("Лист надіслано");
    } catch (_) {
      toast.error("Помилка запиту скидання паролю");
    }
  };

  return (
    <div className="container cnt-mn overlay-cnt-mn">
      <div className="container">
        <div className="grid__main">
          {!isSuccessReset && (
            <>
              {searchParams.size !== 2 && (
                <div className="grid__form">
                  <div className="container h100">
                    <div className="form wrapper h100 flex center">
                      <div className="form__wrapper">
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                          <div className="form__title">Відновлення паролю</div>
                          <div className="form__items">
                            <div className="form__item">
                              <input
                                {...register("email", {
                                  required: true,
                                  pattern: {
                                    value:
                                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                  },
                                })}
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
                                disabled={
                                  !isDirty || !isValid || isLoadingReset
                                }
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
              )}
              {searchParams.size === 2 && <ResetPasswordPage />}
            </>
          )}
          {isSuccessReset && <SendResetPasswordPage />}
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

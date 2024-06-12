import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUser from "../../hooks/useUser";

const ResetPasswordPage = () => {
  const { resetPassword, isLoadingResetPassword } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isDirty },
  } = useForm();

  const resetToken = searchParams.get("reset_token");
  const userId = searchParams.get("id");

  const onSubmitHandler = async (data) => {
    try {
      await resetPassword({ password: data.password, resetToken, userId });
      toast.success("Пароль скинуто");
      navigate("/login");
    } catch (_) {
      toast.error("Помилка скидання паролю");
    }
  };

  const password = watch("password");
  const repeatPassword = watch("repeatPassword");

  return (
    <div className="grid__form">
      <div className="container h100">
        <div className="form wrapper h100 flex center">
          <div className="form__wrapper">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="form__title">Відновлення паролю</div>
              <div className="form__items">
                <div className="form__item">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                    type="password"
                    className="form__input"
                    placeholder="Новий пароль"
                    required
                    autoComplete="true"
                  />
                </div>
                <div className="form__item">
                  <input
                    {...register("repeatPassword", {
                      required: true,
                      minLength: 8,
                    })}
                    type="password"
                    className="form__input"
                    placeholder="Повторіть новий пароль"
                    required
                    autoComplete="true"
                  />
                </div>
                <div className="form__item">
                  <button
                    type="submit"
                    className="button primary fill"
                    disabled={
                      !isDirty ||
                      !isValid ||
                      password !== repeatPassword ||
                      isLoadingResetPassword
                    }
                  >
                    Відновити пароль
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
  );
};

export default ResetPasswordPage;

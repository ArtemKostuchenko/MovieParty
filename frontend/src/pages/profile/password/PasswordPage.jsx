import React, { useRef } from "react";
import { toast } from "react-toastify";
import "./style.page.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordSchema } from "../../../features/validations";
import useUser from "../../../hooks/useUser";

const PasswordPage = () => {
  const { user, updatePassword, isLoadingUpdatePassword } = useUser();
  const submitButtonRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(PasswordSchema),
  });

  const onSubmitHandler = async (data) => {
    try {
      const resp = await updatePassword(data);
      toast.success("Пароль успішно змінено");
    } catch (err) {
      console.log("work");
      toast.error("Помилка зміни паролю");
    }

    // reset();
  };

  return (
    <>
      <div className="flex r sb ch">
        <div className="profile-user-content-title">Пароль</div>
        <button
          className="button primary"
          disabled={!user || !isDirty || !isValid || isLoadingUpdatePassword}
          onClick={() => {
            if (submitButtonRef.current) {
              submitButtonRef.current.click();
            }
          }}
        >
          Зберегти
        </button>
      </div>
      <form
        className="profile-user-content-container"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="password">
          <div className="password-items">
            <div className="password-item">
              <div className="password-title">Поточний пароль</div>
              <input
                type="password"
                {...register("password")}
                className="form__input linear"
                autoComplete=""
              />
            </div>
            <div className="password-item">
              <div className="password-title">Новий пароль</div>
              <input
                type="password"
                {...register("newPassword")}
                className="form__input linear"
                autoComplete=""
              />
            </div>
          </div>
        </div>
        <button ref={submitButtonRef} type="submit" className="hidden"></button>
      </form>
    </>
  );
};

export default PasswordPage;

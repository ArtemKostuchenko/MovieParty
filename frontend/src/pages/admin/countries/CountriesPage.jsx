import React, { useState } from "react";
import "./style.page.scss";
import PopUp from "../../../components/PopUp/PopUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountrySchema } from "../../../features/validations";
import useCountry from "../../../hooks/useCountry";
import { CountryList, PreviewImage } from "../../../components";

const CountryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addCountry, isSuccessAdd, isLoadingAdd } = useCountry();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(CountrySchema),
  });

  const onSubmitHandler = async (data) => {
    const res = await addCountry(data);
    console.log(res);
    setIsOpen(false);
    reset();
  };

  const resetIcon = () => {
    resetField("icon");
  };

  const watchIcon = watch("icon");

  return (
    <>
      <div className="profile-user-content-title">Країни</div>
      <div className="profile-user-content-container">
        <div className="countries">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isOpen || isLoadingAdd}
                onClick={() => setIsOpen(!isOpen)}
              >
                Додати країну
              </button>
              <div className="view-filters">
                <div className="form">
                  <div className="form__item">
                    <div className="form__input__icon g8">
                      <div className="icon find" />
                      <input type="text" placeholder="Пошук..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CountryList />
          </div>
        </div>
      </div>
      {isOpen && (
        <PopUp title="Додавання країни" open={isOpen} setOpen={setIsOpen}>
          <div className="popup__form">
            <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="popup__form-items">
                <div className="popup__form-item">
                  <div className="popup__form-title">Назва країни</div>
                  <input
                    {...register("name")}
                    type="text"
                    className="form__input linear"
                  />
                  {errors.name && (
                    <span className="message error">{errors.name.message}</span>
                  )}
                </div>
                <div className="popup__form-item">
                  <div className="popup__form-title">
                    Оригінальна назва країни
                  </div>
                  <input
                    type="text"
                    {...register("originName")}
                    className="form__input linear"
                  />
                  {errors.originName && (
                    <span className="message error">
                      {errors.originName.message}
                    </span>
                  )}
                </div>
                <div className="popup__form-item">
                  <div className="popup__form-title">Іконку країни (25x20)</div>
                  {!Boolean(watchIcon?.length) ? (
                    <button
                      type="button"
                      className="button primary fill"
                      onClick={() => {
                        const inputRef =
                          document.querySelector('input[name="icon"]');
                        if (!inputRef) return;
                        inputRef.click();
                      }}
                    >
                      Обрати іконку
                    </button>
                  ) : (
                    <PreviewImage file={watchIcon[0]} removeIcon={resetIcon} />
                  )}

                  <input
                    type="file"
                    {...register("icon")}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <button
                  type="submit"
                  className="button primary fill"
                  disabled={!isDirty || !isValid}
                >
                  Додати
                </button>
              </div>
            </form>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default CountryPage;

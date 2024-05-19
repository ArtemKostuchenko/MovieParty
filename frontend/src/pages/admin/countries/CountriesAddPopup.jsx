import React from "react";
import PopUp from "../../../components/PopUp/PopUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountrySchema } from "../../../features/validations";
import { PreviewImage } from "../../../components";
import useCountry from "../../../hooks/useCountry";
import usePopUp from "../../../hooks/usePopup";

const CountriesAddPopup = () => {
  const { addCountry, isLoadingAdd } = useCountry();
  const { isAdd, handleResetPopUp } = usePopUp();

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
    handleResetPopUp();
    reset();
  };

  const resetIcon = () => {
    resetField("icon");
  };

  const watchIcon = watch("icon");

  return (
    <PopUp title="Додавання країни" open={isAdd} setOpen={handleResetPopUp}>
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
              <div className="popup__form-title">Оригінальна назва країни</div>
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
                <PreviewImage icon={watchIcon} removeIcon={resetIcon} />
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
              disabled={!isDirty || !isValid || isLoadingAdd}
            >
              Додати
            </button>
          </div>
        </form>
      </div>
    </PopUp>
  );
};

export default CountriesAddPopup;

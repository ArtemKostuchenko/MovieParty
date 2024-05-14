import React, { useEffect, useState } from "react";
import useCountry from "../../../hooks/useCountry";
import PopUp from "../../../components/PopUp/PopUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountrySchema } from "../../../features/validations";
import { PreviewImage } from "../../../components";
import { useGetCountryByIdQuery } from "../../../features/services/countries/countriesService";

const CountriesEditPopup = () => {
  const { editId, resetHandler } = useCountry();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(CountrySchema),
  });

  if (!editId) {
    return <></>;
  }

  const { data: country, isLoading } = useGetCountryByIdQuery(editId);

  useEffect(() => {
    if (!isLoading) {
      setValue("name", country.name);
      setValue("originName", country.originName);
      setValue("icon", country.icon);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <PopUp title="" open={Boolean(editId)} setOpen={resetHandler}>
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const onSubmitHandler = (data) => {
    resetHandler();
  };

  const resetIcon = () => {
    resetField("icon");
  };

  const watchIcon = watch("icon");

  const { name, originName } = country;

  return (
    <PopUp
      title={`Редагування країни ${name}`}
      open={Boolean(editId)}
      setOpen={resetHandler}
    >
      <div className="popup__form">
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="popup__form-items">
            <div className="popup__form-item">
              <div className="popup__form-title">Назва країни</div>
              <input
                {...register("name")}
                type="text"
                className="form__input linear"
                defaultValue={name}
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
                defaultValue={originName}
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
              disabled={!isDirty || !isValid}
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </PopUp>
  );
};

export default CountriesEditPopup;

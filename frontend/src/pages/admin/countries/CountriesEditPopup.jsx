import React, { useEffect, useState } from "react";
import useCountry from "../../../hooks/useCountry";
import PopUp from "../../../components/PopUp/PopUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountrySchema } from "../../../features/validations";
import { PreviewImage } from "../../../components";
import { useGetCountryByIdQuery } from "../../../features/services/countries/countriesService";
import usePopUp from "../../../hooks/usePopup";

const CountriesEditPopup = () => {
  const { updateCountry, isLoadingUpdate } = useCountry();
  const { editId, handleResetPopUp } = usePopUp();
  const [countryIcon, setCountryIcon] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(CountrySchema),
    defaultValues: {
      isEdit: true,
    },
  });

  if (!editId) {
    return <></>;
  }

  const { data: country, isLoading } = useGetCountryByIdQuery(editId);

  useEffect(() => {
    if (country) {
      setValue("name", country.name);
      setValue("originName", country.originName);
      setCountryIcon(country.icon);
    }
  }, [country, setValue]);

  if (isLoading) {
    return (
      <PopUp title="" open={Boolean(editId)} setOpen={handleResetPopUp}>
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const onSubmitHandler = async (data) => {
    const res = await updateCountry({ id: country._id, ...data });
    console.log(res);
    reset();
    handleResetPopUp();
  };

  const resetIcon = () => {
    if (countryIcon) {
      setCountryIcon(null);
      return;
    }
    resetField("icon");
  };

  const watchIcon = watch("icon");

  const { name } = country;

  return (
    <PopUp
      title={`Редагування країни ${name}`}
      open={Boolean(editId)}
      setOpen={handleResetPopUp}
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
              {!Boolean(watchIcon?.length) && !Boolean(countryIcon) ? (
                <>
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
                  <input
                    type="file"
                    {...register("icon")}
                    className="hidden"
                    accept="image/*"
                  />
                </>
              ) : (
                <PreviewImage
                  icon={countryIcon || watchIcon}
                  removeIcon={resetIcon}
                />
              )}
            </div>
            <button
              type="submit"
              className="button primary fill"
              disabled={!isDirty || !isValid || isLoadingUpdate}
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

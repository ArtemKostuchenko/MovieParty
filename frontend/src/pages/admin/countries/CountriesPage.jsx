import React, { useRef, useState } from "react";
import ua from "../../../assets/icons/ua.svg";
import us from "../../../assets/icons/us.svg";
import gb from "../../../assets/icons/gb.svg";
import "./style.page.scss";
import PopUp from "../../../components/PopUp/PopUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountrySchema } from "../../../features/validations";
import useCountry from "../../../hooks/useCountry";
import { useGetCountriesQuery } from "../../../features/services/countries/countriesService";
import { formatDate } from "../../../features/utils/functions";

const CountryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addNewCountry } = useCountry();
  const { data, isLoading } = useGetCountriesQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(CountrySchema),
  });

  const onSubmitHandler = (_, e) => {
    const formData = new FormData(e.target);
    addNewCountry(formData);
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <div className="profile-user-content-title">Країни</div>
      <div className="profile-user-content-container">
        <div className="countries">
          <div className="view">
            <div className="view-actions">
              <button
                className="button primary"
                disabled={isOpen}
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
            <div className="overflow-content">
              {isLoading && "Loading..."}
              {!isLoading && data && (
                <div className="view-items">
                  <div className="view-row head">
                    <div className="view-col">Назва країни</div>
                    <div className="view-col">Оригінальна назва</div>
                    <div className="view-col">Дата додавання</div>
                    <div className="view-col">Дії</div>
                  </div>
                  {data.data.map((item) => {
                    const icon = `${
                      import.meta.env.VITE_BACK_HOST
                    }/static/files/crs/${item.icon}`;
                    return (
                      <div className="view-row">
                        <div className="view-col flex r g10">
                          <img src={icon} alt={item.name} className="c-i" />
                          {item.name}
                        </div>
                        <div className="view-col">{item.originName}</div>
                        <div className="view-col">
                          {formatDate(item.createdAt)}
                        </div>
                        <div className="view-col">
                          <div className="icon action" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
                  {errors.originalName && (
                    <span className="message error">
                      {errors.originalName.message}
                    </span>
                  )}
                </div>
                <div className="popup__form-item">
                  <div className="popup__form-title">Іконку країни (25x20)</div>
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

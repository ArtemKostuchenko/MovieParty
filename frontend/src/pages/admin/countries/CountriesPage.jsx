import React, { useRef, useState } from "react";
import ua from "../../../assets/icons/ua.svg";
import us from "../../../assets/icons/us.svg";
import gb from "../../../assets/icons/gb.svg";
import "./style.page.scss";
import PopUp from "../../../components/PopUp/PopUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountrySchema } from "../../../features/validations";

const CountryPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(CountrySchema),
  });

  const onSubmitHandler = (data) => {
    console.log(data);
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
              <div className="view-items">
                <div className="view-row head">
                  <div className="view-col">Назва країни</div>
                  <div className="view-col">Оригінальна назва</div>
                  <div className="view-col">Дата додавання</div>
                  <div className="view-col">Дії</div>
                </div>
                <div className="view-row">
                  <div className="view-col flex r g10">
                    <img src={ua} alt="Україна" className="c-i" />
                    Україна
                  </div>
                  <div className="view-col">Ukraine</div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
                <div className="view-row">
                  <div className="view-col flex r g10">
                    <img src={us} alt="США" className="c-i" />
                    США
                  </div>
                  <div className="view-col">USA</div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
                <div className="view-row">
                  <div className="view-col flex r g10">
                    <img src={gb} alt="Велика Британія" className="c-i" />
                    Велика Британія
                  </div>
                  <div className="view-col">United Kingdom</div>
                  <div className="view-col">20 бер, 2024</div>
                  <div className="view-col">
                    <div className="icon action" />
                  </div>
                </div>
              </div>
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
                    {...register("originalName")}
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
                      const inputRef = document.querySelector(
                        'input[name="countryIcon"]'
                      );
                      if (!inputRef) return;
                      inputRef.click();
                    }}
                  >
                    Обрати іконку
                  </button>
                  <input
                    type="file"
                    {...register("countryIcon")}
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

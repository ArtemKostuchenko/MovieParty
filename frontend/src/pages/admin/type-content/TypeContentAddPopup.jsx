import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TypeContentSchema } from "../../../features/validations";
import PopUp from "../../../components/PopUp/PopUp";
import useTypeContent from "../../../hooks/useTypeContent";
import { DropDown, DropDownItem } from "../../../components";

const TypeContentAddPopup = () => {
  const { isAddTypeContent, resetHandler } = useTypeContent();
  const [isSeries, setIsSeries] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(TypeContentSchema),
  });

  const onSubmitHandler = async (data) => {
    console.log(data);
    // resetHandler();
    // reset();
  };

  return (
    <PopUp
      title="Додавання типу контенту"
      open={isAddTypeContent}
      setOpen={resetHandler}
    >
      <div className="popup__form">
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="popup__form-items">
            <div className="popup__form-item">
              <div className="popup__form-title">Назва типу</div>
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
              <div className="popup__form-title">Шлях</div>
              <input
                type="text"
                {...register("path")}
                className="form__input linear"
              />
              {errors.path && (
                <span className="message error">{errors.path.message}</span>
              )}
            </div>
            <div className="popup__form-item">
              <div className="popup__form-title">Серійний тип</div>
              <DropDown linear fill onChange={(value) => setIsSeries(false)}>
                <DropDownItem value={true}>Так</DropDownItem>
                <DropDownItem value={false} selected>
                  Ні
                </DropDownItem>
              </DropDown>
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
  );
};

export default TypeContentAddPopup;

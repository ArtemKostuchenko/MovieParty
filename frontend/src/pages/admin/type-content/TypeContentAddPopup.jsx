import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TypeContentSchema } from "../../../features/validations";
import PopUp from "../../../components/PopUp/PopUp";
import useTypeContent from "../../../hooks/useTypeContent";
import usePopUp from "../../../hooks/usePopup";
import { DropDown, DropDownItem } from "../../../components";

const TypeContentAddPopup = () => {
  const { addTypeContent, isLoadingAdd } = useTypeContent();
  const { isAdd, handleResetPopUp } = usePopUp();
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
    const res = await addTypeContent({ isSeries, ...data });
    console.log(res);
    handleResetPopUp();
    reset();
  };

  return (
    <PopUp
      title="Додавання типу контенту"
      open={isAdd}
      setOpen={handleResetPopUp}
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
              <DropDown linear fill onChange={(value) => setIsSeries(value)}>
                <DropDownItem value={true}>Так</DropDownItem>
                <DropDownItem value={false} selected>
                  Ні
                </DropDownItem>
              </DropDown>
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

export default TypeContentAddPopup;

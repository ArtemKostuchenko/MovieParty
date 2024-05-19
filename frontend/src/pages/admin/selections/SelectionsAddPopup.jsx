import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectionSchema } from "../../../features/validations";
import PopUp from "../../../components/PopUp/PopUp";
import useSelection from "../../../hooks/useSelection";
import usePopUp from "../../../hooks/usePopup";

const SelectionsAddPopup = () => {
  const { addSelection, isLoadingAdd } = useSelection();
  const { isAdd, handleResetPopUp } = usePopUp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(SelectionSchema),
  });

  const onSubmitHandler = async (data) => {
    const res = await addSelection(data);
    console.log(res);
    handleResetPopUp();
    reset();
  };

  return (
    <PopUp title="Додавання підбірки" open={isAdd} setOpen={handleResetPopUp}>
      <div className="popup__form">
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="popup__form-items">
            <div className="popup__form-item">
              <div className="popup__form-title">Назва підбірки</div>
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
              <div className="popup__form-title">Опис підбірки</div>
              <textarea
                {...register("description")}
                className="form__textarea linear"
              ></textarea>
              {errors.description && (
                <span className="message error">
                  {errors.description.message}
                </span>
              )}
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

export default SelectionsAddPopup;

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PartSchema } from "../../../features/validations";
import PopUp from "../../../components/PopUp/PopUp";
import usePart from "../../../hooks/usePart";
import usePopUp from "../../../hooks/usePopup";

const PartsAddPopup = () => {
  const { addPart, isLoadingAdd } = usePart();
  const { isAdd, handleResetPopUp } = usePopUp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(PartSchema),
  });

  const onSubmitHandler = async (data) => {
    const res = await addPart(data);
    console.log(res);
    handleResetPopUp();
    reset();
  };

  return (
    <PopUp title="Додавання частини" open={isAdd} setOpen={handleResetPopUp}>
      <div className="popup__form">
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="popup__form-items">
            <div className="popup__form-item">
              <div className="popup__form-title">Назва частини</div>
              <input
                {...register("name")}
                type="text"
                className="form__input linear"
              />
              {errors.name && (
                <span className="message error">{errors.name.message}</span>
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

export default PartsAddPopup;

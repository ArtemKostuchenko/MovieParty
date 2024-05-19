import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GenreSchema } from "../../../features/validations";
import PopUp from "../../../components/PopUp/PopUp";
import useGenre from "../../../hooks/useGenre";
import usePopUp from "../../../hooks/usePopup";

const GenresAddPopup = () => {
  const { addGenre, isLoadingAdd } = useGenre();
  const { isAdd, handleResetPopUp } = usePopUp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(GenreSchema),
  });

  const onSubmitHandler = async (data) => {
    const res = await addGenre(data);
    console.log(res);
    handleResetPopUp();
    reset();
  };

  return (
    <PopUp title="Додавання жанру" open={isAdd} setOpen={handleResetPopUp}>
      <div className="popup__form">
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="popup__form-items">
            <div className="popup__form-item">
              <div className="popup__form-title">Назва жанру</div>
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
              <div className="popup__form-title">Оригінальна назва</div>
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

export default GenresAddPopup;

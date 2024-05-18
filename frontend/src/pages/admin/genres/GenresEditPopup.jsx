import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GenreSchema } from "../../../features/validations";
import { useGetGenreByIdQuery } from "../../../features/services/genre/genreService";
import PopUp from "../../../components/PopUp/PopUp";
import useGenre from "../../../hooks/useGenre";
const GenresEditPopup = () => {
  const { editId, resetHandler, updateGenre, isLoadingUpdate } = useGenre();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(GenreSchema),
  });

  if (!editId) {
    return <></>;
  }

  const { data: genre, isLoading } = useGetGenreByIdQuery(editId);

  useEffect(() => {
    if (genre) {
      setValue("name", genre.name);
      setValue("originName", genre.originName);
    }
  }, [genre, setValue]);

  if (isLoading) {
    return (
      <PopUp title="" open={Boolean(editId)} setOpen={resetHandler}>
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const onSubmitHandler = async (data) => {
    const res = await updateGenre({
      id: genre._id,
      ...data,
    });
    console.log(res);
    reset();
    resetHandler();
  };

  const { name } = genre;

  return (
    <PopUp
      title={`Редагування жанру`}
      open={Boolean(editId)}
      setOpen={resetHandler}
    >
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

export default GenresEditPopup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonSchema } from "../../../features/validations";
import { PreviewImage } from "../../../components";
import { DropDown, DropDownItem } from "../../../components";
import useActor from "../../../hooks/useActor";

const ActorsAddPage = () => {
  const { addActor, isLoadingAdd } = useActor();
  const navigate = useNavigate();
  const [sex, setSex] = useState("Man");

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(PersonSchema),
  });

  const onSubmitHandler = async (data) => {
    const res = await addActor({ sex, ...data });
    console.log(res);
    reset();
    navigate("..", { relative: "path" });
  };

  const resetPhoto = () => {
    resetField("photoURL");
  };

  const watchPhotoURL = watch("photoURL");

  return (
    <form className="person__form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="person__form-info">
        <div className="person__form-card">
          {!Boolean(watchPhotoURL?.length) ? (
            <button
              className="button primary"
              onClick={() => {
                const inputRef = document.querySelector(
                  'input[name="photoURL"]'
                );
                if (!inputRef) return;
                inputRef.click();
              }}
            >
              Обрати фото
            </button>
          ) : (
            <PreviewImage
              icon={watchPhotoURL}
              removeIcon={resetPhoto}
              classImage="prs"
            />
          )}
          <input
            type="file"
            {...register("photoURL")}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
      <div className="person__form-content">
        <div className="person__form-content-title">Дані про актора</div>
        <div className="person__form-form">
          <div className="form__grid">
            <div className="form__item label">
              <div className="form__item-label">Прізвище</div>
              <input
                {...register("lastName")}
                type="text"
                className="form__input linear"
              />
            </div>
            <div className="form__item label">
              <div className="form__item-label">Ім`я</div>
              <input
                {...register("firstName")}
                type="text"
                className="form__input linear"
              />
            </div>
            <div className="form__item label">
              <div className="form__item-label">Прізвище (англійською)</div>
              <input
                {...register("lastNameEng")}
                type="text"
                className="form__input linear"
              />
            </div>
            <div className="form__item label">
              <div className="form__item-label">Ім`я (англійською)</div>
              <input
                {...register("firstNameEng")}
                type="text"
                className="form__input linear"
              />
            </div>
            <div className="form__item label fg">
              <div className="form__item-label">Дата народження</div>
              <input
                {...register("dateBirth")}
                type="date"
                className="form__input linear"
              />
            </div>
            <div className="form__item label fg">
              <div className="form__item-label">Стать</div>
              <DropDown linear fill onChange={(value) => setSex(value)}>
                <DropDownItem value="Man" selected>
                  Чоловік
                </DropDownItem>
                <DropDownItem value="Woman">Жінка</DropDownItem>
              </DropDown>
            </div>
            <div className="form__item label fg">
              <div className="form__item-label">Місце народження</div>
              <input
                {...register("placeBirth")}
                type="text"
                className="form__input linear"
              />
            </div>
            <div className="form__item fg">
              <button
                className="button primary fill"
                type="submit"
                disabled={!isDirty || !isValid || isLoadingAdd}
              >
                Додати актора
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ActorsAddPage;

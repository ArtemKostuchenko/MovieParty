import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonSchema } from "../../../features/validations";
import { PreviewImage } from "../../../components";
import { DropDown, DropDownItem } from "../../../components";
import { useGetActorByIdQuery } from "../../../features/services/actors/actorsService";
import useActor from "../../../hooks/useActor";
import { formatDate } from "../../../features/utils/functions";

const ActorsEditPage = () => {
  const { updateActor, isLoadingUpdate } = useActor();
  const { id: editId } = useParams();
  const navigate = useNavigate();
  const [sex, setSex] = useState("Man");
  const [photoURL, setPhotoURL] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(PersonSchema),
    defaultValues: {
      isEdit: true,
    },
  });

  if (!editId) {
    return <></>;
  }

  const { data: actor, isLoading } = useGetActorByIdQuery(editId);

  useEffect(() => {
    if (actor) {
      setValue("firstName", actor.firstName);
      setValue("lastName", actor.lastName);
      setValue("firstNameEng", actor.firstNameEng);
      setValue("lastNameEng", actor.lastNameEng);
      setValue("dateBirth", formatDate(actor.dateBirth, "hyphen"));
      setValue("dateDeath", formatDate(actor.dateDeath, "hyphen"));
      setValue("placeBirth", actor.placeBirth);
      setSex(actor.sex);
      setPhotoURL(actor.photoURL);
    }
  }, [actor, setValue]);

  if (isLoading) {
    return (
      <div className="loader__container">
        <div className="loader"></div>
      </div>
    );
  }

  const onSubmitHandler = async (data) => {
    const res = await updateActor({ id: actor._id, sex, ...data });
    console.log(res);
    reset();
    navigate("../actors", { relative: "route" });
  };

  const resetPhoto = () => {
    if (photoURL) {
      setPhotoURL(null);
      return;
    }
    resetField("photoURL");
  };

  const watchPhotoURL = watch("photoURL");

  return (
    <form className="person__form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="person__form-info">
        <div className="person__form-card">
          {!Boolean(watchPhotoURL?.length) && !Boolean(photoURL) ? (
            <>
              <button
                type="button"
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
              <input
                type="file"
                {...register("photoURL")}
                className="hidden"
                accept="image/*"
              />
            </>
          ) : (
            <PreviewImage
              icon={photoURL || watchPhotoURL}
              removeIcon={resetPhoto}
              classImage="prs"
              path="images/actors"
            />
          )}
        </div>
      </div>
      <div className="person__form-content">
        <div className="person__form-content-title">
          Редагування даних актора
        </div>
        <div className="person__form-form">
          <div className="form__grid">
            <div className="form__item label">
              <div className="form__item-label">Прізвище</div>
              <input
                {...register("lastName")}
                type="text"
                className="form__input linear"
              />
              {errors.lastName && (
                <span className="message error">{errors.lastName.message}</span>
              )}
            </div>
            <div className="form__item label">
              <div className="form__item-label">Ім`я</div>
              <input
                {...register("firstName")}
                type="text"
                className="form__input linear"
              />
              {errors.firstName && (
                <span className="message error">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="form__item label">
              <div className="form__item-label">Прізвище (англійською)</div>
              <input
                {...register("lastNameEng")}
                type="text"
                className="form__input linear"
              />
              {errors.lastNameEng && (
                <span className="message error">
                  {errors.lastNameEng.message}
                </span>
              )}
            </div>
            <div className="form__item label">
              <div className="form__item-label">Ім`я (англійською)</div>
              <input
                {...register("firstNameEng")}
                type="text"
                className="form__input linear"
              />
              {errors.firstNameEng && (
                <span className="message error">
                  {errors.firstNameEng.message}
                </span>
              )}
            </div>
            <div className="form__item label">
              <div className="form__item-label">Дата народження</div>
              <input
                {...register("dateBirth")}
                type="date"
                className="form__input linear"
              />
              {errors.dateBirth && (
                <span className="message error">
                  {errors.dateBirth.message}
                </span>
              )}
            </div>
            <div className="form__item label">
              <div className="form__item-label">Дата смерті (опціонально)</div>
              <input
                {...register("dateDeath")}
                type="date"
                className="form__input linear"
              />
              {errors.dateDeath && (
                <span className="message error">
                  {errors.dateDeath.message}
                </span>
              )}
            </div>
            <div className="form__item label fg">
              <div className="form__item-label">Стать</div>
              <DropDown
                value={sex}
                linear
                fill
                onChange={(value) => setSex(value)}
              >
                <DropDownItem value="Man">Чоловік</DropDownItem>
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
              {errors.placeBirth && (
                <span className="message error">
                  {errors.placeBirth.message}
                </span>
              )}
            </div>
            <div className="form__item fg">
              <button
                className="button primary fill"
                type="submit"
                disabled={!isDirty || !isValid || isLoadingUpdate}
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ActorsEditPage;

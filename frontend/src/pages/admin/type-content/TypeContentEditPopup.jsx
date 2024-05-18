import React, { useEffect, useState } from "react";
import useTypeContent from "../../../hooks/useTypeContent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TypeContentSchema } from "../../../features/validations";
import { useGetTypeContentByIdQuery } from "../../../features/services/type-content/typeContentService";
import PopUp from "../../../components/PopUp/PopUp";
import { DropDown, DropDownItem } from "../../../components";

const TypeContentEditPopup = () => {
  const { editId, resetHandler, updateTypeContent, isLoadingUpdate } =
    useTypeContent();
  const [isSeries, setIsSeries] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(TypeContentSchema),
  });

  if (!editId) {
    return <></>;
  }

  const { data: typeContent, isLoading } = useGetTypeContentByIdQuery(editId);

  useEffect(() => {
    if (typeContent) {
      setValue("name", typeContent.name);
      setValue("path", typeContent.path);
      setIsSeries(typeContent.isSeries);
    }
  }, [typeContent, setValue]);

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
    const res = await updateTypeContent({
      id: typeContent._id,
      isSeries,
      ...data,
    });
    console.log(res);
    reset();
    resetHandler();
  };

  const { name } = typeContent;

  console.log(isSeries);

  return (
    <PopUp
      title={`Редагування типу контенту ${name}`}
      open={Boolean(editId)}
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
              <DropDown linear fill onChange={(value) => setIsSeries(value)}>
                <DropDownItem value={true} selected={isSeries === true}>
                  Так
                </DropDownItem>
                <DropDownItem value={false} selected={isSeries === false}>
                  Ні
                </DropDownItem>
              </DropDown>
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

export default TypeContentEditPopup;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectionSchema } from "../../../features/validations";
import { useGetSelectionByIdQuery } from "../../../features/services/selections/selectionsService";
import PopUp from "../../../components/PopUp/PopUp";
import useSelection from "../../../hooks/useSelection";
import usePopUp from "../../../hooks/usePopup";

const SelectionsEditPopup = () => {
  const { updateSelection, isLoadingUpdate } = useSelection();
  const { editId, handleResetPopUp } = usePopUp();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(SelectionSchema),
  });

  if (!editId) {
    return <></>;
  }

  const { data: selection, isLoading } = useGetSelectionByIdQuery(editId);

  useEffect(() => {
    if (selection) {
      setValue("name", selection.name);
      setValue("description", selection.description);
    }
  }, [selection, setValue]);

  if (isLoading) {
    return (
      <PopUp title="" open={Boolean(editId)} setOpen={handleResetPopUp}>
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const onSubmitHandler = async (data) => {
    const res = await updateSelection({
      id: selection._id,
      ...data,
    });
    console.log(res);
    reset();
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Редагування підбірки"
      open={Boolean(editId)}
      setOpen={handleResetPopUp}
    >
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

export default SelectionsEditPopup;

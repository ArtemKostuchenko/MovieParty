import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PartSchema } from "../../../features/validations";
import { useGetPartByIdQuery } from "../../../features/services/parts/partsService";
import PopUp from "../../../components/PopUp/PopUp";
import usePart from "../../../hooks/usePart";
import usePopUp from "../../../hooks/usePopup";

const PartsEditPopup = () => {
  const { updatePart, isLoadingUpdate } = usePart();
  const { editId, handleResetPopUp } = usePopUp();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(PartSchema),
  });

  if (!editId) {
    return <></>;
  }

  const { data: part, isLoading } = useGetPartByIdQuery(editId);

  useEffect(() => {
    if (part) {
      setValue("name", part.name);
    }
  }, [part, setValue]);

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
    const res = await updatePart({
      id: part._id,
      ...data,
    });
    console.log(res);
    reset();
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Редагування частини"
      open={Boolean(editId)}
      setOpen={handleResetPopUp}
    >
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

export default PartsEditPopup;

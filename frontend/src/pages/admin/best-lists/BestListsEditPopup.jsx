import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BestListSchema } from "../../../features/validations";
import { useGetBestListByIdQuery } from "../../../features/services/best-lists/bestListsService";
import PopUp from "../../../components/PopUp/PopUp";
import useBestList from "../../../hooks/useBestList";
import usePopUp from "../../../hooks/usePopup";

const BestListsEditPopup = () => {
  const { updateBestList, isLoadingUpdate } = useBestList();
  const { editId, handleResetPopUp } = usePopUp();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(BestListSchema),
  });

  if (!editId) {
    return <></>;
  }

  const { data: bestList, isLoading } = useGetBestListByIdQuery(editId);

  useEffect(() => {
    if (bestList) {
      setValue("name", bestList.name);
    }
  }, [bestList, setValue]);

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
    const res = await updateBestList({
      id: bestList._id,
      ...data,
    });
    console.log(res);
    reset();
    handleResetPopUp();
  };

  return (
    <PopUp
      title="Редагування списку"
      open={Boolean(editId)}
      setOpen={handleResetPopUp}
    >
      <div className="popup__form">
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="popup__form-items">
            <div className="popup__form-item">
              <div className="popup__form-title">Назва списку</div>
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

export default BestListsEditPopup;

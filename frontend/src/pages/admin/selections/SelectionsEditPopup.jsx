import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectionSchema } from "../../../features/validations";
import { useGetSelectionByIdQuery } from "../../../features/services/selections/selectionsService";
import PopUp from "../../../components/PopUp/PopUp";
import useSelection from "../../../hooks/useSelection";
import usePopUp from "../../../hooks/usePopup";
import SearchSelections from "../../../components/Selections/SearchSelections";
import { PreviewImage } from "../../../components";

const SelectionsEditPopup = () => {
  const { updateSelection, isLoadingUpdate } = useSelection();
  const { editId, handleResetPopUp } = usePopUp();
  const [previewURL, setPreviewURL] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(SelectionSchema),
    defaultValues: {
      isEdit: true,
    },
  });

  if (!editId) {
    return <></>;
  }

  const { data: selection, isLoading } = useGetSelectionByIdQuery(editId);

  useEffect(() => {
    if (selection) {
      setValue("name", selection.name);
      setValue("description", selection.description);
      setValue("videoContents", selection.videoContents);
      setPreviewURL(selection.previewURL);
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
    await updateSelection({
      id: selection._id,
      ...data,
    });
    reset();
    handleResetPopUp();
  };

  const resetPreviewURL = () => {
    if (previewURL) {
      setPreviewURL(null);
      return;
    }
    resetField("previewURL");
  };

  const watchPreviewURL = watch("previewURL");

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
              <div className="popup__form-title">Обкладинка підбірки</div>
              {!Boolean(watchPreviewURL?.length) && !Boolean(previewURL) ? (
                <>
                  <button
                    type="button"
                    className="button primary"
                    onClick={() => {
                      const inputRef = document.querySelector(
                        'input[name="previewURL"]'
                      );
                      if (!inputRef) return;
                      inputRef.click();
                    }}
                  >
                    Обрати обкладинку
                  </button>
                  <input
                    type="file"
                    {...register("previewURL")}
                    className="hidden"
                    accept="image/*"
                  />
                </>
              ) : (
                <PreviewImage
                  icon={previewURL || watchPreviewURL}
                  removeIcon={resetPreviewURL}
                  classImage="slc"
                  path="images/selections"
                />
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
            <div className="popup__form-item">
              <div className="popup__form-title">Відеоконтент</div>
              <SearchSelections control={control} />
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

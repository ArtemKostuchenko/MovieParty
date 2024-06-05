import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoomSchema } from "../../features/validations";
import { PopUp, DropDown, DropDownItem } from "../../components";
import useRoom from "../../hooks/useRoom";
import usePopUp from "../../hooks/usePopup";

const RoomCreatePopup = ({ videoContentId = "" }) => {
  const { createRoom, isLoadingAdd } = useRoom();
  const { editId, handleResetPopUp } = usePopUp();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      videoContentId: videoContentId,
      isPublic: true,
      maxNumberUsers: 2,
      voiceChat: false,
    },
    resolver: yupResolver(RoomSchema),
  });

  const onSubmitHandler = async (data) => {
    const res = await createRoom(data);
    console.log(res);
    handleResetPopUp();
    reset();
  };

  const isPublic = watch("isPublic");

  return (
    <PopUp
      title="Створення кімнати"
      open={Boolean(editId)}
      setOpen={handleResetPopUp}
    >
      <div className="popup__form">
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="popup__form-items">
            <div className="popup__form-item">
              <div className="popup__form-title">Назва кімнати</div>
              <input
                {...register("title")}
                type="text"
                className="form__input linear"
              />
              {errors.title && (
                <span className="message error">{errors.title.message}</span>
              )}
            </div>
            <div className="popup__form-item">
              <div className="popup__form-title">
                Максимальна кількість користувачів
              </div>
              <input
                type="number"
                min={2}
                max={20}
                {...register("maxNumberUsers")}
                className="form__input linear"
              />
              {errors.maxNumberUsers && (
                <span className="message error">
                  {errors.maxNumberUsers.message}
                </span>
              )}
            </div>
            <div className="popup__form-item">
              <div className="popup__form-title">Доступність кімнати</div>
              <Controller
                name="isPublic"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DropDown
                      value={value}
                      onChange={onChange}
                      placeholder="Оберіть доступність"
                      linear
                      fill
                    >
                      <DropDownItem value={true}>Публічна</DropDownItem>
                      <DropDownItem value={false}>Приватна</DropDownItem>
                    </DropDown>
                  );
                }}
              />
              {errors.isPublic && (
                <span className="message error">{errors.isPublic.message}</span>
              )}
            </div>
            {!isPublic && (
              <div className="popup__form-item">
                <div className="popup__form-title">Пароль кімнати</div>
                <input
                  type="password"
                  {...register("password")}
                  className="form__input linear"
                />
                {errors.password && (
                  <span className="message error">
                    {errors.password.message}
                  </span>
                )}
              </div>
            )}
            <div className="popup__form-item">
              <div className="popup__form-title">Тип чату</div>
              <Controller
                name="voiceChat"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DropDown
                      value={value}
                      onChange={onChange}
                      placeholder="Оберіть тип чату"
                      linear
                      fill
                    >
                      <DropDownItem value={false}>Чат</DropDownItem>
                      <DropDownItem value={true}>Голосовий</DropDownItem>
                    </DropDown>
                  );
                }}
              />
              {errors.voiceChat && (
                <span className="message error">
                  {errors.voiceChat.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="button primary fill"
              disabled={!isDirty || !isValid || isLoadingAdd}
            >
              Створити кімнату
            </button>
          </div>
        </form>
      </div>
    </PopUp>
  );
};

export default RoomCreatePopup;

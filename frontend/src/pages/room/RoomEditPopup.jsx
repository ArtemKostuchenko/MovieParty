import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoomSchema } from "../../features/validations";
import {
  PopUp,
  DropDown,
  DropDownItem,
  DropDownLoader,
} from "../../components";
import useRoom from "../../hooks/useRoom";
import usePopUp from "../../hooks/usePopup";
import { useGetRoomByIdQuery } from "../../features/services/rooms/roomsService";
import { useGetVideoContentQuery } from "../../features/services/content/contentService";
import useUser from "../../hooks/useUser";

const RoomEditPopup = ({ handleUpdate, handleFinish }) => {
  const { updateRoom, isLoadingUpdate, removeRoom, isLoadingRemove } =
    useRoom();
  const { editId, handleResetPopUp } = usePopUp();
  const { refetchUser } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(RoomSchema),
  });

  if (!editId) {
    return <></>;
  }

  const { data: room, isLoading } = useGetRoomByIdQuery(editId);

  useEffect(() => {
    if (room) {
      setValue("title", room.title);
      setValue("maxNumberUsers", room.maxNumberUsers);
      setValue("isPublic", room.isPublic);
      setValue("voiceChat", room.voiceChat);
      setValue("videoContentId", room.videoContent._id);
    }
  }, [room, setValue]);

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
    try {
      await updateRoom(editId, data);
      toast.success("Кімнату оновлено");
      if (handleUpdate && typeof handleUpdate === "function") handleUpdate();
      handleResetPopUp();
      reset();
    } catch (e) {
      toast.error("Помилка оновлення кімнати");
    }
  };

  const handleFinishSession = async () => {
    if (handleFinish && typeof handleFinish === "function") {
      handleFinish();
    }
    try {
      await removeRoom(editId);
      handleResetPopUp();
      toast.info("Сеанс кімнати завершено");
      refetchUser();
      navigate("/");
    } catch (err) {
      toast.error("Помилка видалення кімнати");
    }
  };

  const isPublic = watch("isPublic");

  return (
    <PopUp
      title="Редагування кімнати"
      open={Boolean(editId)}
      setOpen={handleResetPopUp}
      grid
    >
      <div className="popup__form">
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="popup__form-items popup__grid">
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
            {!isPublic && (
              <div className="popup__form-item col2">
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
            <div className="popup__form-item col2">
              <div className="popup__form-title">
                Обраний контент для перегляду
              </div>
              <Controller
                name="videoContentId"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DropDownLoader
                      value={value}
                      searchBy="title"
                      query={useGetVideoContentQuery}
                      dataName="videoContent"
                      limit={8}
                      onChange={onChange}
                      placeholder="Оберіть відеоконтент"
                      placeholderSearch="Введіть назву відеоконтенту"
                      fill
                      linear
                    />
                  );
                }}
              />
              {errors.voiceChat && (
                <span className="message error">
                  {errors.voiceChat.message}
                </span>
              )}
            </div>
            <div className="popup__form-item col2">
              <button
                type="submit"
                className="button primary fill"
                disabled={!isDirty || !isValid || isLoadingUpdate}
              >
                Зберегти
              </button>
            </div>
            <div className="popup__form-item col2">
              <button
                type="submit"
                className="button danger fill"
                disabled={isLoadingUpdate || isLoadingRemove}
                onClick={handleFinishSession}
              >
                Завершити сеанс
              </button>
            </div>
          </div>
        </form>
      </div>
    </PopUp>
  );
};

export default RoomEditPopup;

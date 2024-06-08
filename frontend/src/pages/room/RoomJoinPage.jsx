import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useRoom from "../../hooks/useRoom";
import { Avatar, Loader, NotFound } from "../../components";
import useFill from "../../hooks/useFill";
import { useGetRoomByInviteCodeQuery } from "../../features/services/rooms/roomsService";
import { toast } from "react-toastify";

const RoomJoinPage = () => {
  const { inviteCode, inviteUserToRoom, isLoadingInvite } = useRoom();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const {} = useFill();

  const { data, isLoading } = useGetRoomByInviteCodeQuery(inviteCode);

  if (!inviteCode) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <NotFound title="Кімнату не знайдено" image="room" />;
  }

  const { _id: roomId, title, isPublic, maxNumberUsers, users } = data;

  const handleChangePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleConnectToRoom = async () => {
    try {
      const res = await inviteUserToRoom(roomId, password);
      navigate(`/room/${res.data}`);
    } catch (err) {
      if (password) {
        toast.error("Неправильний пароль кімнати");
        return;
      }
      toast.error("Помилка приєднання до кімнати");
    }
  };

  return (
    <div className="container cnt-mn">
      <div className="container full" style={{ height: "100%" }}>
        <div className="wrapper">
          <div className="room full">
            <div className="room__join">
              <div className="room__join-container">
                <div className="room__join-title">Приєднання до кімнати</div>
                <div className="room__join-name">{title}</div>
                <div className="room__join-users">
                  {!Boolean(users.length) && (
                    <div className="room__join-user">
                      В кімнаті нікого немає
                    </div>
                  )}
                  {users.map((user) => {
                    <div className="room__join-user" key={user._id}>
                      <Avatar
                        nickname={"Telegram"}
                        avatarColor={"#249fc7"}
                        width={25}
                        height={25}
                      />
                      ,
                    </div>;
                  })}
                </div>
                {!isPublic && (
                  <>
                    {" "}
                    <div className="room__join-description">
                      Щоб приєднатися до кімнати введіть пароль
                    </div>
                    <div className="room__join-form">
                      <div className="form__item">
                        <input
                          type="password"
                          className="form__input linear"
                          value={password}
                          onChange={handleChangePassword}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                {maxNumberUsers <= users.length && (
                  <span className="message error">
                    Кімната вже заповнена (максимум {maxNumberUsers})
                  </span>
                )}
                <button
                  className="button primary fill"
                  onClick={handleConnectToRoom}
                  disabled={maxNumberUsers <= users.length || isLoadingInvite}
                >
                  Приєднатися
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="splitter"></div>
    </div>
  );
};

export default RoomJoinPage;

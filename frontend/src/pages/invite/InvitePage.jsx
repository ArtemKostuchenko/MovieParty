import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFill from "../../hooks/useFill";
import { Loader, NotFound } from "../../components";
import useRoom from "../../hooks/useRoom";
import { useGetRoomByInviteCodeQuery } from "../../features/services/rooms/roomsService";

const InvitePage = () => {
  const navigate = useNavigate();
  const {} = useFill();
  const { inviteCode } = useRoom();

  const { data, isLoading } = useGetRoomByInviteCodeQuery(inviteCode);

  if (isLoading) {
    return <Loader />;
  }

  if (data) {
    navigate("/room/join");
  }

  return (
    <NotFound
      title="Запрошувальний код є недійсним"
      description="Спробуйте ще раз або повторіть пізніше"
      image="invite"
    />
  );
};

export default InvitePage;

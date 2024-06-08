import { useDispatch, useSelector } from "react-redux";
import {
  setChatState,
  setUsersState,
  setMicrophoneState,
} from "../features/store/slices/room";
import {
  useCreateRoomMutation,
  useUpdateRoomByIdMutation,
  useRemoveRoomByIdMutation,
  useInviteUserToRoomMutation,
} from "../features/services/rooms/roomsService";
import { useEffect } from "react";

const useRoom = () => {
  const dispatch = useDispatch();
  const { isChatOpen, isUsersOpen, isMicOn, inviteCode } = useSelector(
    (store) => store.room
  );
  const [createMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useCreateRoomMutation();
  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateRoomByIdMutation();
  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveRoomByIdMutation();
  const [
    inviteMutation,
    { isLoading: isLoadingInvite, isSuccess: isSuccessInvite },
  ] = useInviteUserToRoomMutation();

  const createRoom = async (room) => {
    return await createMutation(room).unwrap();
  };

  const updateRoom = async (roomId, room) => {
    return await updateMutation({ roomId, ...room }).unwrap();
  };

  const removeRoom = async (roomId) => {
    return await removeMutation(roomId).unwrap();
  };

  const inviteUserToRoom = async (roomId, password = "") => {
    return await inviteMutation({ roomId, password }).unwrap();
  };

  const toggleChat = () => {
    dispatch(setChatState(!isChatOpen));
  };

  const toggleUsers = () => {
    dispatch(setUsersState(!isUsersOpen));
  };

  const toggleMicrophone = () => {
    dispatch(setMicrophoneState(!isMicOn));
  };

  useEffect(() => {
    return () => {
      if (isMicOn) {
        dispatch(setMicrophoneState(false));
      }
    };
  }, []);

  return {
    inviteCode,
    createRoom,
    isLoadingAdd,
    isSuccessAdd,
    isUsersOpen,
    isChatOpen,
    isMicOn,
    toggleChat,
    toggleUsers,
    toggleMicrophone,
    inviteUserToRoom,
    isLoadingInvite,
    isSuccessInvite,
    updateRoom,
    isLoadingUpdate,
    isSuccessUpdate,
    removeRoom,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useRoom;

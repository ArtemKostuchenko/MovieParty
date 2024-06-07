import { useDispatch, useSelector } from "react-redux";
import { setChatState, setUsersState } from "../features/store/slices/room";
import {
  useCreateRoomMutation,
  useUpdateRoomByIdMutation,
  useInviteUserToRoomMutation,
} from "../features/services/rooms/roomsService";

const useRoom = () => {
  const dispatch = useDispatch();
  const { isChatOpen, isUsersOpen, inviteCode } = useSelector(
    (store) => store.room
  );
  const [createMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useCreateRoomMutation();
  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateRoomByIdMutation();
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

  const inviteUserToRoom = async (roomId, password = "") => {
    return await inviteMutation({ roomId, password }).unwrap();
  };

  const toggleChat = () => {
    dispatch(setChatState(!isChatOpen));
  };

  const toggleUsers = () => {
    dispatch(setUsersState(!isUsersOpen));
  };

  return {
    inviteCode,
    createRoom,
    isLoadingAdd,
    isSuccessAdd,
    isUsersOpen,
    isChatOpen,
    toggleChat,
    toggleUsers,
    inviteUserToRoom,
    isLoadingInvite,
    isSuccessInvite,
    updateRoom,
    isLoadingUpdate,
    isSuccessUpdate,
  };
};

export default useRoom;

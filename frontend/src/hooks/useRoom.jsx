import { useDispatch, useSelector } from "react-redux";
import { setChatState } from "../features/store/slices/room";
import {
  useCreateRoomMutation,
  useInviteUserToRoomMutation,
} from "../features/services/rooms/roomsService";

const useRoom = () => {
  const dispatch = useDispatch();
  const { isChatOpen, inviteCode } = useSelector((store) => store.room);
  const [createMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useCreateRoomMutation();
  const [
    inviteMutation,
    { isLoading: isLoadingInvite, isSuccess: isSuccessInvite },
  ] = useInviteUserToRoomMutation();

  const createRoom = async (room) => {
    return await createMutation(room).unwrap();
  };

  const inviteUserToRoom = async (roomId, password = "") => {
    return await inviteMutation({ roomId, password }).unwrap();
  };

  const toggleChat = () => {
    dispatch(setChatState(!isChatOpen));
  };

  return {
    inviteCode,
    createRoom,
    isLoadingAdd,
    isSuccessAdd,
    isChatOpen,
    toggleChat,
    inviteUserToRoom,
    isLoadingInvite,
    isSuccessInvite,
  };
};

export default useRoom;

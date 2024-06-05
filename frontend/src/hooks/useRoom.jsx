import { useDispatch, useSelector } from "react-redux";
import { setChatState } from "../features/store/slices/room";
import { useCreateRoomMutation } from "../features/services/rooms/roomsService";

const useRoom = () => {
  const dispatch = useDispatch();
  const { isChatOpen, inviteCode } = useSelector((store) => store.room);
  const [createMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useCreateRoomMutation();

  const createRoom = async (room) => {
    return await createMutation(room).unwrap();
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
  };
};

export default useRoom;

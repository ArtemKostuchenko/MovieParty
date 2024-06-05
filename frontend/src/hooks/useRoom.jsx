import { useCreateRoomMutation } from "../features/services/rooms/roomsService";

const useGenre = () => {
  const [createMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useCreateRoomMutation();

  const createRoom = async (room) => {
    return await createMutation(room).unwrap();
  };

  return {
    createRoom,
    isLoadingAdd,
    isSuccessAdd,
  };
};

export default useGenre;

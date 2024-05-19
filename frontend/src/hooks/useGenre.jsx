import {
  useAddGenreMutation,
  useUpdateGenreMutation,
  useRemoveGenreMutation,
} from "../features/services/genre/genreService";

const useGenre = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddGenreMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateGenreMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveGenreMutation();

  const addGenre = async (genre) => {
    return await addMutation(genre).unwrap();
  };

  const updateGenre = async (genre) => {
    return await updateMutation(genre).unwrap();
  };

  const removeGenre = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    addGenre,
    isLoadingAdd,
    isSuccessAdd,
    updateGenre,
    isLoadingUpdate,
    isSuccessUpdate,
    removeGenre,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useGenre;

import {
  useAddDirectorMutation,
  useUpdateDirectorMutation,
  useRemoveDirectorMutation,
} from "../features/services/directors/directorsService";

const useDirector = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddDirectorMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateDirectorMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveDirectorMutation();

  const addDirector = async (director) => {
    return await addMutation(director).unwrap();
  };

  const updateDirector = async (director) => {
    return await updateMutation(director).unwrap();
  };

  const removeDirector = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    addDirector,
    isLoadingAdd,
    isSuccessAdd,
    updateDirector,
    isLoadingUpdate,
    isSuccessUpdate,
    removeDirector,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useDirector;

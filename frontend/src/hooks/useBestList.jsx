import {
  useAddBestListMutation,
  useUpdateBestListMutation,
  useRemoveBestListMutation,
} from "../features/services/best-lists/bestListsService";

const useBestList = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddBestListMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateBestListMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveBestListMutation();

  const addBestList = async (genre) => {
    return await addMutation(genre).unwrap();
  };

  const updateBestList = async (genre) => {
    return await updateMutation(genre).unwrap();
  };

  const removeBestList = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    addBestList,
    isLoadingAdd,
    isSuccessAdd,
    updateBestList,
    isLoadingUpdate,
    isSuccessUpdate,
    removeBestList,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useBestList;

import {
  useAddPartMutation,
  useUpdatePartMutation,
  useRemovePartMutation,
} from "../features/services/parts/partsService";

const usePart = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddPartMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdatePartMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemovePartMutation();

  const addPart = async (part) => {
    return await addMutation(part).unwrap();
  };

  const updatePart = async (part) => {
    return await updateMutation(part).unwrap();
  };

  const removePart = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    addPart,
    isLoadingAdd,
    isSuccessAdd,
    updatePart,
    isLoadingUpdate,
    isSuccessUpdate,
    removePart,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default usePart;

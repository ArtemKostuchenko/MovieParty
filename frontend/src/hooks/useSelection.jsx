import {
  useAddSelectionMutation,
  useUpdateSelectionMutation,
  useRemoveSelectionMutation,
} from "../features/services/selections/selectionsService";

const useSelection = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddSelectionMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateSelectionMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveSelectionMutation();

  const addSelection = async (selection) => {
    return await addMutation(selection).unwrap();
  };

  const updateSelection = async (selection) => {
    return await updateMutation(selection).unwrap();
  };

  const removeSelection = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    addSelection,
    isLoadingAdd,
    isSuccessAdd,
    updateSelection,
    isLoadingUpdate,
    isSuccessUpdate,
    removeSelection,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useSelection;

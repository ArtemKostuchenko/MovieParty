import {
  useAddTypeContentMutation,
  useRemoveTypeContentMutation,
  useUpdateTypeContentMutation,
} from "../features/services/type-content/typeContentService";

const useTypeContent = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddTypeContentMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveTypeContentMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateTypeContentMutation();

  const addTypeContent = async (typeContent) => {
    return await addMutation(typeContent).unwrap();
  };

  const updateTypeContent = async (typeContent) => {
    return await updateMutation(typeContent).unwrap();
  };

  const removeTypeContent = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    addTypeContent,
    isLoadingAdd,
    isSuccessAdd,
    updateTypeContent,
    isLoadingUpdate,
    isSuccessUpdate,
    removeTypeContent,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useTypeContent;

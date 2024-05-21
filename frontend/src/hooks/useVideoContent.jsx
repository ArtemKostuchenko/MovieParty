import {
  useAddVideoContentMutation,
  useUpdateVideoContentMutation,
  useRemoveVideoContentMutation,
} from "../features/services/content/contentService";

const useVideoContent = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddVideoContentMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateVideoContentMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveVideoContentMutation();

  const addVideoContent = async (videoContent) => {
    return await addMutation(videoContent).unwrap();
  };

  const updateVideoContent = async (videoContent) => {
    return await updateMutation(videoContent).unwrap();
  };

  const removeVideoContent = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    addVideoContent,
    isLoadingAdd,
    isSuccessAdd,
    updateVideoContent,
    isLoadingUpdate,
    isSuccessUpdate,
    removeVideoContent,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useVideoContent;

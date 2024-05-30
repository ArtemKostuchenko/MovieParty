import {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useRemoveReviewMutation,
} from "../features/services/reviews/reviewsService";

const useReview = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddReviewMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateReviewMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveReviewMutation();

  const addReview = async (videoContentId, message) => {
    return await addMutation({ videoContentId, message }).unwrap();
  };

  const updateReview = async (videoContentId, message) => {
    return await updateMutation({ videoContentId, message }).unwrap();
  };

  const removeReview = async (reviewId) => {
    return await removeMutation(reviewId).unwrap();
  };

  return {
    addReview,
    isLoadingAdd,
    isSuccessAdd,
    updateReview,
    isLoadingUpdate,
    isSuccessUpdate,
    removeReview,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useReview;

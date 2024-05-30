import {
  useAddReviewMutation,
  useLikeReviewMutation,
  useDislikeReviewMutation,
  useUpdateReviewMutation,
  useRemoveReviewMutation,
} from "../features/services/reviews/reviewsService";

const useReview = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddReviewMutation();

  const [
    likeMutation,
    { isLoading: isLoadingLike, isSuccess: isSuccessLiked },
  ] = useLikeReviewMutation();

  const [
    dislikeMutation,
    { isLoading: isLoadingDisLike, isSuccess: isSuccessDisLiked },
  ] = useDislikeReviewMutation();

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

  const likeReview = async (reviewId) => {
    return await likeMutation(reviewId).unwrap();
  };

  const dislikeReview = async (reviewId) => {
    return await dislikeMutation(reviewId).unwrap();
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
    likeReview,
    isLoadingLike,
    isSuccessLiked,
    dislikeReview,
    isLoadingDisLike,
    isSuccessDisLiked,
    updateReview,
    isLoadingUpdate,
    isSuccessUpdate,
    removeReview,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useReview;

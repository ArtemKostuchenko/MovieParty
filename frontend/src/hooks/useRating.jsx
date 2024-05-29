import { useRateVideoContentMutation } from "../features/services/ratings/ratingsService";

const useRating = () => {
  const [
    rateMutation,
    { isLoading: isLoadingRate, isSuccess: isSuccessRated },
  ] = useRateVideoContentMutation();

  const rateVideoContent = async (videoContentId) => {
    return await rateMutation(videoContentId).unwrap();
  };

  return {
    rateVideoContent,
    isLoadingRate,
    isSuccessRated,
  };
};

export default useRating;

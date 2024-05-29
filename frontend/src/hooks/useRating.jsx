import { useRateVideoContentMutation } from "../features/services/ratings/ratingsService";

const useRating = () => {
  const [
    rateMutation,
    { isLoading: isLoadingRate, isSuccess: isSuccessRated },
  ] = useRateVideoContentMutation();

  const rateVideoContent = async (videoContentId, rate) => {
    return await rateMutation({ videoContentId, rate }).unwrap();
  };

  return {
    rateVideoContent,
    isLoadingRate,
    isSuccessRated,
  };
};

export default useRating;

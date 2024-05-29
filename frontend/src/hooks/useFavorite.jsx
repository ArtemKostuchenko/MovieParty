import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../features/services/favorites/favoritesService";

const useFavorite = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddFavoriteMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveFavoriteMutation();

  const addFavorite = async (videoContentId) => {
    return await addMutation(videoContentId).unwrap();
  };

  const removeFavorite = async (videoContentId) => {
    return await removeMutation(videoContentId).unwrap();
  };

  return {
    addFavorite,
    isLoadingAdd,
    isSuccessAdd,
    removeFavorite,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useFavorite;

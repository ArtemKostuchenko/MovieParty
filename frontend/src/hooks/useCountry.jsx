import {
  useAddCountryMutation,
  useRemoveCountryMutation,
  useUpdateCountryMutation,
} from "../features/services/countries/countriesService";

const useCountry = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddCountryMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateCountryMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveCountryMutation();

  const addCountry = async (country) => {
    return await addMutation(country).unwrap();
  };

  const updateCountry = async (country) => {
    return await updateMutation(country).unwrap();
  };

  const removeCountry = async (id) => {
    return await removeMutation(id);
  };

  return {
    addCountry,
    isLoadingAdd,
    isSuccessAdd,
    updateCountry,
    isLoadingUpdate,
    isSuccessUpdate,
    removeCountry,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useCountry;

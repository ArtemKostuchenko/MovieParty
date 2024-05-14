import { useDispatch, useSelector } from "react-redux";
import {
  handleAddCountry,
  editCountry,
  removeCountry as rmCountry,
  resetCountry,
} from "../features/store/slices/country";
import {
  useAddCountryMutation,
  useRemoveCountryMutation,
} from "../features/services/countries/countriesService";

const useCountry = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddCountryMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveCountryMutation();

  const dispatch = useDispatch();

  const { isAddCountry, editId, removeId } = useSelector(
    (store) => store.country
  );

  const addCountry = async (country) => {
    return await addMutation(country).unwrap();
  };

  const addCountryHandler = () => {
    dispatch(handleAddCountry());
  };

  const editCountryHandler = (id) => {
    dispatch(editCountry(id));
  };

  const removeCountryHandler = (id) => {
    dispatch(rmCountry(id));
  };

  const removeCountry = async (id) => {
    return await removeMutation(id);
  };

  const resetHandler = () => {
    dispatch(resetCountry());
  };

  return {
    isAddCountry,
    addCountryHandler,
    addCountry,
    isLoadingAdd,
    isSuccessAdd,
    editId,
    editCountryHandler,
    removeId,
    removeCountryHandler,
    removeCountry,
    isLoadingRemove,
    isSuccessRemove,
    resetHandler,
  };
};

export default useCountry;

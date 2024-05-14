import { useDispatch, useSelector } from "react-redux";
import {
  handleAddCountry,
  editCountry,
  removeCountry,
  resetCountry,
} from "../features/store/slices/country";
import { useAddCountryMutation } from "../features/services/countries/countriesService";

const useCountry = () => {
  const [mutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddCountryMutation();

  const dispatch = useDispatch();

  const { isAddCountry, editId, removeId } = useSelector(
    (store) => store.country
  );

  const addCountry = async (country) => {
    return await mutation(country).unwrap();
  };

  const addCountryHandler = () => {
    dispatch(handleAddCountry());
  };

  const editCountryHandler = (id) => {
    dispatch(editCountry(id));
  };

  const removeCountryHandler = (id) => {
    dispatch(removeCountry(id));
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
    resetHandler,
  };
};

export default useCountry;

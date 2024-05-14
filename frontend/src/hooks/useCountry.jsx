import { useDispatch, useSelector } from "react-redux";
import {
  handleAddCountry,
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
    removeId,
    resetHandler,
  };
};

export default useCountry;

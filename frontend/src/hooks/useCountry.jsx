import { useDispatch, useSelector } from "react-redux";
import { useAddCountryMutation } from "../features/services/countries/countriesService";

const useCountry = () => {
  const [mutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddCountryMutation();

  const addCountry = async (country) => {
    return await mutation(country).unwrap();
  };

  return {
    addCountry,
    isLoadingAdd,
    isSuccessAdd,
  };
};

export default useCountry;

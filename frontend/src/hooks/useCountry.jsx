import { useDispatch, useSelector } from "react-redux";
import { addCountry } from "../features/store/slices/country";

const useCountry = () => {
  const { isLoading, country, isError, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const addNewCountry = (formData) => {
    dispatch(addCountry(formData));
  };

  return {
    isLoading,
    country,
    isError,
    error,
    addNewCountry,
  };
};

export default useCountry;

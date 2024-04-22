import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../features/store/slices/user";

const useUser = () => {
  const { isLoading, user, isError, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const loginUser = (email, password) => {
    dispatch(login({ email, password }));
  };

  const registerUser = (email, nickname, password) => {
    dispatch(register({ email, nickname, password }));
  };

  return {
    isLoading,
    user,
    isError,
    error,
    loginUser,
    registerUser,
    isAuth: !isLoading && user,
  };
};

export default useUser;

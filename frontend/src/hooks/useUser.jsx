import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/store/slices/user";

const useUser = () => {
  const { isLoading, user, isError, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const loginUser = (email, password) => {
    dispatch(login({ email, password }));
  };

  return {
    isLoading,
    user,
    isError,
    error,
    loginUser,
    isAuth: !isLoading && user,
  };
};

export default useUser;

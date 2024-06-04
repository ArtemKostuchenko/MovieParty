import { useDispatch, useSelector } from "react-redux";
import { fetchUser, login, register } from "../features/store/slices/user";
import {
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} from "../features/services/users/usersService";

const useUser = () => {
  const { isLoading, user, isError, error } = useSelector(
    (state) => state.user
  );

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateMeMutation();

  const [
    updatePasswordMutation,
    { isLoading: isLoadingUpdatePassword, isSuccess: isSuccessUpdatePassword },
  ] = useUpdatePasswordMutation();

  const dispatch = useDispatch();

  const loginUser = (email, password) => {
    dispatch(login({ email, password }));
  };

  const registerUser = (email, nickname, password) => {
    dispatch(register({ email, nickname, password }));
  };

  const updateMe = async (data) => {
    return await updateMutation(data).unwrap();
  };

  const updatePassword = async (data) => {
    return await updatePasswordMutation(data).unwrap();
  };

  const refetchUser = async () => {
    dispatch(fetchUser());
  };

  return {
    isLoading,
    user,
    isError,
    error,
    loginUser,
    registerUser,
    isAuth: !isLoading && user,
    updateMe,
    isLoadingUpdate,
    isSuccessUpdate,
    refetchUser,
    updatePassword,
    isLoadingUpdatePassword,
    isSuccessUpdatePassword,
  };
};

export default useUser;

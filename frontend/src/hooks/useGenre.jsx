import { useDispatch, useSelector } from "react-redux";

import {
  changePage,
  resetPage as resPage,
  changeSort,
  handleAddGenre,
  removeGenre as rmGenre,
  editGenre,
  resetGenre,
} from "../features/store/slices/genre";

import {
  useAddGenreMutation,
  useUpdateGenreMutation,
  useRemoveGenreMutation,
} from "../features/services/genre/genreService";

const useGenre = () => {
  const dispatch = useDispatch();

  const { page, sortName, sortType, isAddGenre, removeId, editId } =
    useSelector((store) => store.genre);

  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddGenreMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateGenreMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveGenreMutation();

  const onChangePage = (page) => {
    dispatch(changePage(page));
  };

  const resetPage = () => {
    dispatch(resPage());
  };

  const onChangeSort = (sortName, sortType) => {
    dispatch(changeSort({ sortName, sortType }));
  };

  const addGenreHandler = () => {
    dispatch(handleAddGenre());
  };

  const editGenreHandler = (id) => {
    dispatch(editGenre(id));
  };

  const removeGenreHandler = (id) => {
    dispatch(rmGenre(id));
  };

  const resetHandler = () => {
    dispatch(resetTypeContent());
  };

  const addGenre = async (genre) => {
    return await addMutation(genre).unwrap();
  };

  const updateGenre = async (genre) => {
    return await updateMutation(genre).unwrap();
  };

  const removeGenre = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    page,
    onChangePage,
    resetPage,
    sortName,
    sortType,
    onChangeSort,
    isAddGenre,
    addGenreHandler,
    resetHandler,
    addGenre,
    isLoadingAdd,
    isSuccessAdd,
    removeId,
    removeGenreHandler,
    removeGenre,
    isLoadingRemove,
    isSuccessRemove,
    editId,
    editGenreHandler,
    updateGenre,
    isLoadingUpdate,
    isSuccessUpdate,
  };
};

export default useGenre;

import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  resetPage as resPage,
  changeSort,
  handleAddTypeContent,
  removeTypeContent as rmTypeContent,
  resetTypeContent,
} from "../features/store/slices/type-content";
import {
  useAddTypeContentMutation,
  useRemoveTypeContentMutation,
} from "../features/services/type-content/typeContentService";

const useTypeContent = () => {
  const dispatch = useDispatch();

  const { isAddTypeContent, page, sortName, sortType, removeId } = useSelector(
    (store) => store.typeContent
  );

  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddTypeContentMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveTypeContentMutation();

  const onChangePage = (page) => {
    dispatch(changePage(page));
  };

  const resetPage = () => {
    dispatch(resPage());
  };

  const onChangeSort = (sortName, sortType) => {
    dispatch(changeSort({ sortName, sortType }));
  };

  const addTypeContentHandler = () => {
    dispatch(handleAddTypeContent());
  };

  const removeTypeContentHandler = (id) => {
    dispatch(rmTypeContent(id));
  };

  const resetHandler = () => {
    dispatch(resetTypeContent());
  };

  const addTypeContent = async (typeContent) => {
    return await addMutation(typeContent).unwrap();
  };

  const removeTypeContent = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    page,
    onChangePage,
    resetPage,
    sortName,
    sortType,
    onChangeSort,
    isAddTypeContent,
    addTypeContentHandler,
    resetHandler,
    addTypeContent,
    isLoadingAdd,
    isSuccessAdd,
    removeId,
    removeTypeContentHandler,
    removeTypeContent,
  };
};

export default useTypeContent;

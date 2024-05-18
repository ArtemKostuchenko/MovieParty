import { useDispatch, useSelector } from "react-redux";

import {
  changePage,
  resetPage as resPage,
  changeSort,
  handleAddTypeContent,
  resetTypeContent,
} from "../features/store/slices/type-content";

const useTypeContent = () => {
  const dispatch = useDispatch();

  const { isAddTypeContent, page, sortName, sortType } = useSelector(
    (store) => store.typeContent
  );

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

  const resetHandler = () => {
    dispatch(resetTypeContent());
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
  };
};

export default useTypeContent;

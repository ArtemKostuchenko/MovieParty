import { useDispatch, useSelector } from "react-redux";

import {
  changePage,
  resetPage as resPage,
  changeSort,
} from "../features/store/slices/type-content";

const useTypeContent = () => {
  const dispatch = useDispatch();

  const { page, sortName, sortType } = useSelector(
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

  return {
    page,
    onChangePage,
    resetPage,
    sortName,
    sortType,
    onChangeSort,
  };
};

export default useTypeContent;

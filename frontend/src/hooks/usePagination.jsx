import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, resetPage } from "../features/store/slices/pagination";

const usePagination = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((store) => store.pagination);

  const handleChangePage = (page) => {
    dispatch(changePage(page));
  };

  const handleResetPage = () => {
    dispatch(resetPage());
  };

  useEffect(() => {
    return () => {
      handleResetPage();
    };
  }, []);

  return {
    page,
    handleChangePage,
    handleResetPage,
  };
};

export default usePagination;

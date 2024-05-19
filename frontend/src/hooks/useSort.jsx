import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSort, resetSort } from "../features/store/slices/sort";

const useSort = () => {
  const dispatch = useDispatch();
  const { sortName, sortType } = useSelector((store) => store.sort);

  const handleChangeSort = (sortName, sortType) => {
    dispatch(changeSort({ sortName, sortType }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetSort());
    };
  }, []);

  return {
    sortName,
    sortType,
    handleChangeSort,
  };
};

export default useSort;

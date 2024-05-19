import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAdd,
  handleEdit,
  handleRemove,
  handleReset,
} from "../features/store/slices/popup";

const usePopUp = () => {
  const dispatch = useDispatch();
  const { isAdd, editId, removeId } = useSelector((store) => store.popup);

  const handleAddPopUp = () => {
    dispatch(handleAdd());
  };

  const handleEditPopUp = (id) => {
    dispatch(handleEdit(id));
  };

  const handleRemovePopUp = (id) => {
    dispatch(handleRemove(id));
  };

  const handleResetPopUp = () => {
    dispatch(handleReset());
  };

  return {
    isAdd,
    editId,
    removeId,
    handleAddPopUp,
    handleEditPopUp,
    handleRemovePopUp,
    handleResetPopUp,
  };
};

export default usePopUp;

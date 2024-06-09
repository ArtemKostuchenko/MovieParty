import React from "react";

import PopUp from "../../../components/PopUp/PopUp";
import usePopUp from "../../../hooks/usePopup";
import useReview from "../../../hooks/useReview";
import { useGetReviewByIdQuery } from "../../../features/services/reviews/reviewsService";

const CommentRemovePopup = ({ handleSuccessDelete }) => {
  const { removeReview, isLoadingRemove } = useReview();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: review, isLoading } = useGetReviewByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення коментаря"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const { _id } = review;

  const handleRemoveReview = async () => {
    try {
      await removeReview(_id);
      if (handleSuccessDelete && typeof handleSuccessDelete === "function")
        handleSuccessDelete();
      handleResetPopUp();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PopUp
      title="Видалення коментаря"
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити свій коментар
        </div>
        <button
          className="button primary"
          onClick={handleRemoveReview}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default CommentRemovePopup;

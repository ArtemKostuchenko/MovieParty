import React from "react";
import { useGetVideoContentByIdQuery } from "../../../features/services/content/contentService";
import PopUp from "../../../components/PopUp/PopUp";
import useVideoContent from "../../../hooks/useVideoContent";
import usePopUp from "../../../hooks/usePopup";

const VideoContentRemovePopup = () => {
  const { removeVideoContent, isLoadingRemove } = useVideoContent();
  const { removeId, handleResetPopUp } = usePopUp();

  if (!removeId) {
    return <></>;
  }

  const { data: videoContent, isLoading } =
    useGetVideoContentByIdQuery(removeId);

  if (isLoading) {
    return (
      <PopUp
        title="Видалення відеоконтенту"
        open={Boolean(removeId)}
        setOpen={handleResetPopUp}
      >
        <div className="loader__container">
          <div className="loader"></div>
        </div>
      </PopUp>
    );
  }

  const handleRemoveVideoContent = async () => {
    const res = await removeVideoContent(_id);
    console.log(res);
    handleResetPopUp();
  };

  console.log(videoContent);

  const { _id, title } = videoContent;

  return (
    <PopUp
      title="Видалення відеоконтенту"
      open={Boolean(removeId)}
      setOpen={handleResetPopUp}
    >
      <div className="flex col g10">
        <div className="popup__text center">
          Ви дійсно бажаєте видалити відеоконтент{" "}
          <span className="highlight">{title}</span>
        </div>
        <button
          className="button primary"
          onClick={handleRemoveVideoContent}
          disabled={isLoadingRemove}
        >
          Видалити
        </button>
      </div>
    </PopUp>
  );
};

export default VideoContentRemovePopup;

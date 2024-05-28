import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import usePopUp from "../../hooks/usePopup";

const TrailerPopUp = ({ trailer }) => {
  const { handleResetPopUp } = usePopUp();
  const containerRef = useRef(null);

  useEffect(() => {
    if (open) {
      disablePageScroll();
    }

    return () => {
      enablePageScroll();
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        handleResetPopUp();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, handleResetPopUp]);

  return (
    <div className="trailer">
      <div className="trailer__container" ref={containerRef}>
        <div className="trailer__content">
          <ReactPlayer url={trailer} width="100%" height="100%" />
        </div>
        <button className="trailer__close" onClick={handleResetPopUp}>
          <div className="icon close"></div>
        </button>
      </div>
    </div>
  );
};

export default TrailerPopUp;

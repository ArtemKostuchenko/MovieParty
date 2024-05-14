import React, { useEffect, useState } from "react";

const PreviewImage = ({ icon, removeIcon }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (typeof icon !== "string") {
      const reader = new FileReader();

      reader.readAsDataURL(icon[0]);

      reader.onload = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview(`${import.meta.env.VITE_BACK_HOST}/static/files/crs/${icon}`);
    }
  }, [icon]);

  return (
    <div className="preview-image">
      <div className="preview-image__container">
        <img src={preview} className="crs" alt="Preview" />
        <button
          type="button"
          className="preview-image__close"
          onClick={() => removeIcon()}
        >
          <div className="icon close"></div>
        </button>
        <div className="preview-image__name">
          {icon[0]?.name ? icon.name : icon}
        </div>
      </div>
    </div>
  );
};

export default PreviewImage;

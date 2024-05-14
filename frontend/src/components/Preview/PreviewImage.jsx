import React, { useState } from "react";

const PreviewImage = ({ file, removeIcon }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    setPreview(reader.result);
  };

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
        <div className="preview-image__name">{file.name}</div>
      </div>
    </div>
  );
};

export default PreviewImage;

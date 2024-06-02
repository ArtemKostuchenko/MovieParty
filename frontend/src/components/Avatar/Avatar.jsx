import React, { useRef, useState } from "react";
import useUser from "../../hooks/useUser";

const Avatar = ({
  photoURL,
  nickname,
  avatarColor,
  width = 50,
  height = 50,
  fontSize,
  updatable = false,
  handlePhotoUpdate,
}) => {
  const { isLoadingUpdate } = useUser();
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const photoURLPath = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/u/${photoURL}`;

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0] && !isLoadingUpdate) {
      if (!handlePhotoUpdate || typeof handlePhotoUpdate !== "function") return;
      handlePhotoUpdate(event.target.files[0]);
    }
  };

  return (
    <div
      className="avatar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width, height }}
    >
      {photoURL ? (
        <img src={photoURLPath} alt={nickname} style={{ width, height }} />
      ) : (
        <div
          className="avatar__letter"
          style={{
            backgroundColor: avatarColor || "#2986cc",
            width,
            height,
            fontSize,
          }}
        >
          {nickname.toUpperCase()[0]}
        </div>
      )}
      {updatable && isHovered && !isLoadingUpdate && (
        <button onClick={handleButtonClick}>
          <div className="icon camera"></div>
        </button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default Avatar;

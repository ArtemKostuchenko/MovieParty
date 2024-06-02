import React from "react";

const Avatar = ({
  photoURL,
  nickname,
  avatarColor,
  width = 50,
  height = 50,
}) => {
  const photoURLPath = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/users/${photoURL}`;

  return (
    <div className="avatar">
      {photoURL && (
        <img src={photoURLPath} alt={nickname} style={{ width, height }} />
      )}
      {!photoURL && (
        <div
          className="avatar__letter"
          style={{ backgroundColor: avatarColor || "#2986cc", width, height }}
        >
          {nickname.toUpperCase()[0]}
        </div>
      )}
    </div>
  );
};

export default Avatar;

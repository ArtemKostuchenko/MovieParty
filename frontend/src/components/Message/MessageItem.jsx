import React from "react";
import Avatar from "../Avatar/Avatar";

const MessageItem = ({ userId, message }) => {
  return (
    <div className="chat__message">
      <div className="chat__message-sender">
        <div className="chat__message-avatar">
          <Avatar
            nickname={userId.nickname}
            photoURL={userId.avatarURL}
            avatarColor={userId.avatarColor}
            width={30}
            height={30}
          />
        </div>
        <div className="chat__message-nickname">{userId.nickname}</div>
      </div>
      <div className="chat__message-content">{message}</div>
    </div>
  );
};

export default MessageItem;

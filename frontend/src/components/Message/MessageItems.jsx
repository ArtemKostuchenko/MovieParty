import React from "react";
import MessageItem from "./MessageItem";

const MessageItems = ({ messages }) => {
  return (
    <div className="chat__messages">
      {messages.map((message) => {
        return <MessageItem key={message._id} {...message} />;
      })}
    </div>
  );
};

export default MessageItems;

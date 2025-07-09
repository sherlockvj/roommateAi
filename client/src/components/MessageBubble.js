import React from "react";
import "./styles/MessageBubble.css";

const MessageBubble = ({ message, currentUserId }) => {
  const isOwnMessage = message.userId === currentUserId;
  const formattedTime = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`bubble-wrapper ${isOwnMessage ? "own" : "other"}`}>
      <div className={`bubble ${isOwnMessage ? "user" : "ai"}`}>
        {!isOwnMessage && <div className="sender-name">{message.userName}</div>}
        <div className="message-text">{message.text}</div>
        <div className="message-meta">{formattedTime}</div>
      </div>
    </div>
  );
};

export default MessageBubble;

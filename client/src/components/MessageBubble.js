import React from "react";
import "./styles/MessageBubble.css";

const MessageBubble = ({ message }) => {
  const isAI = message.type === "ai";

  return (
    <div className={`bubble ${isAI ? "ai" : "user"}`}>
      <div className="sender">{message.sender}</div>
      <div className="text">{message.text}</div>
    </div>
  );
};

export default MessageBubble;

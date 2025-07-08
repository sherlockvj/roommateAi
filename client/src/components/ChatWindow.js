import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import "./ChatWindow.css";

const initialMessages = [
  { id: 1, sender: "Vishal", text: "Hey team, any doubts?", type: "user" },
  { id: 2, sender: "AI Bot", text: "Need help with recursion?", type: "ai" },
  { id: 3, sender: "Vishal", text: "Yes please!", type: "user" },
  { id: 4, sender: "Vishal", text: "Yes please!", type: "user" },
  { id: 5, sender: "Vishal", text: "Yes please!", type: "user" },
  { id: 6, sender: "Vishal", text: "Yes please!", type: "user" },
  { id: 7, sender: "Vishal", text: "Yes please!", type: "user" },
  { id: 8, sender: "Vishal", text: "Yes please!", type: "user" },
  { id: 9, sender: "Vishal", text: "Yes please!", type: "user" },
  { id: 10, sender: "Vishal", text: "Yes please!", type: "user" },
  { id: 11, sender: "Vishal", text: "Yes please!", type: "user" }
];

const ChatWindow = ({ room }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", text: input, type: "user" }]);
    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">{room?.name || "Select a Room"}</div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

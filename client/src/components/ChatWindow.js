import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import MessageBubble from "./MessageBubble";
import "./styles/ChatWindow.css";
import api from "../api/axios";

const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const ChatWindow = ({ user }) => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!roomId || !user) return;


    const fetchMessages = async () => {
      try {
        const res = await api.get(`/message/room/${roomId}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();

    socket.emit("joinRoom", {
      roomId,
      user: {
        _id: user.id,
        name: user.name,
      },
    });

    // Receive messages
    socket.on("receiveMessage", (message) => {
      console.log("New message received via socket:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId, user]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", {
      roomId,
      message: input,
    });
    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">Room ID: {roomId}</div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} currentUserId={user?.id} />
        ))}
        <div ref={messagesEndRef} />
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

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { FaCopy } from "react-icons/fa";

import MessageBubble from "./MessageBubble";
import "./styles/ChatWindow.css";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

const ChatWindow = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!roomId || !user) return;

    const fetchRoomAndMessages = async () => {
      try {
        const roomRes = await api.get(`/room/${roomId}`);
        setRoom(roomRes.data.room);

        const msgRes = await api.get(`/message/room/${roomId}`);
        setMessages(msgRes.data.messages);
      } catch (err) {
        console.error("Failed to load room or messages", err);
        navigate("/")
      }
    };

    fetchRoomAndMessages();

    const socket = io("https://roommateai.onrender.com", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    setSocket(socket)

    socket.emit("joinRoom", {
      roomId,
      user: {
        _id: user.id,
        name: user.name,
      },
    });

    socket.on("receiveMessage", (message) => {
      console.log("Message recieved on client::" + JSON.stringify(message))
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

  if (!room) return <div className="chat-window">Loading room...</div>;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="room-info">
          <h2 className="room-title">{room.name}</h2>
          <div className="room-id-copy">
            <span className="room-id">Room ID: {room._id}</span>
            <button
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText(room._id);
                alert("Room ID copied!");
              }}
            >
              <FaCopy />
            </button>
          </div>
        </div>
      </div>


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
import React, { useState } from "react";

import "./styles/JoinRoomModal.css";
import Modal from "../components/Modal";

const JoinRoomModal = ({ isOpen, onClose, onJoin }) => {
  const [roomId, setRoomId] = useState("");

  const handleJoin = () => {
    if (roomId.trim()) {
      onJoin(roomId.trim());
      setRoomId("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join Room by ID">
      <div className="join-by-id-content">
        <label htmlFor="room-id">Enter Room ID:</label>
        <input
          type="text"
          id="room-id"
          placeholder="e.g. 665cfaabc12f4b001fd0a123"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={handleJoin}>Join Room</button>
      </div>
    </Modal>
  );
};

export default JoinRoomModal;

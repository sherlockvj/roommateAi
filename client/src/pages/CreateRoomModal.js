import React, { useState } from "react";

import "./styles/CreateRoomModal.css";
import Modal from "../components/Modal";

const CreateRoomModal = ({ isOpen, onClose, onCreate, onSwitchToJoin }) => {
  const [roomName, setRoomName] = useState("");
  const [context, setContext] = useState("A helpful assistant");
  const [temperature, setTemperature] = useState("neutral");

  const handleSubmit = () => {
    if (!roomName.trim()) return;
    const tempValue = {
      accurate: 0.2,
      neutral: 0.7,
      "highly-creative": 1.0
    }[temperature];
    onCreate({ roomName, context, temperature: tempValue });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Room">
      <div className="form-group">
        <label>Room Name</label>
        <input
          type="text"
          placeholder="e.g. Doubt Discussion"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>AI Context</label>
        <input
          type="text"
          placeholder="e.g. Maths teacher, Trip planner, Startup mentor"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <p className="field-hint">Set the personality of AI in this room. E.g. “a friendly programming mentor”</p>
      </div>

      <div className="form-group">
        <label>AI Response Style</label>
        <select value={temperature} onChange={(e) => setTemperature(e.target.value)}>
          <option value="accurate">Accurate (eg. for Maths teacher)</option>
          <option value="neutral">Neutral (Default)</option>
          <option value="highly-creative">Highly Creative (eg. for a Storyteller)</option>
        </select>
      </div>

      <button className="create-btn" onClick={handleSubmit}>Create Room</button>

      <div className="switch-option">
        <span>Want to join an existing room instead? </span>
        <button className="link-btn" onClick={onSwitchToJoin}>
          Browse Rooms
        </button>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;

import React, { useEffect, useState } from "react";
import "./styles/JoinRoomModal.css";
import Modal from "../components/Modal";
import api from "../api/axios";
import { useNotification } from "../contexts/NotificationContext";

const JoinRoomModal = ({ isOpen, onClose, onJoin, prefillRoomId = "" }) => {
  const [roomIdInput, setRoomIdInput] = useState("");
  const [roomDetails, setRoomDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { showNotification } = useNotification();

  useEffect(() => {
    if (prefillRoomId) {
      setRoomIdInput(prefillRoomId);
      handleFetchRoom(prefillRoomId);
    }
  }, [prefillRoomId]);

  const handleFetchRoom = async (idToCheck) => {
    setLoading(true);
    setError("");
    setRoomDetails(null);

    try {
      const res = await api.get(`/room/${idToCheck || roomIdInput.trim()}`);
      setRoomDetails(res.data.room);
    } catch (err) {
      setError("Room not found.");
      showNotification("error", "Room not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = () => {
    if (roomDetails && roomDetails._id) {
      onJoin(roomDetails._id);
      resetModal();
    }
  };

  const resetModal = () => {
    setRoomIdInput("");
    setRoomDetails(null);
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetModal} title="Join Room by ID">
      <div className="join-by-id-content">
        {!roomDetails ? (
          <>
            <label htmlFor="room-id">Enter Room ID:</label>
            <input
              type="text"
              id="room-id"
              placeholder="e.g. 665cfaabc12f4b001fd0a123"
              value={roomIdInput}
              onChange={(e) => setRoomIdInput(e.target.value)}
            />
            {error && <div className="error">{error}</div>}
            <button onClick={() => handleFetchRoom()} disabled={loading}>
              {loading ? "Checking..." : "Next"}
            </button>
          </>
        ) : (
          <>
            <p><strong>Room Name:</strong> {roomDetails.name}</p>
            <p><strong>Room ID:</strong> <code>{roomDetails._id}</code></p>
            <div className="button-row">
              <button onClick={handleJoin}>Join</button>
              <button onClick={resetModal} className="cancel-btn">Cancel</button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default JoinRoomModal;

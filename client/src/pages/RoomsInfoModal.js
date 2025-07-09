
import React from "react";
import "./styles/RoomsInfoModal.css";
import Modal from "../components/Modal.js";

const RoomsInfoModal = ({ isOpen, onClose, rooms = [], onJoin, onDelete, onSwitchToJoin }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Your Rooms">
            {rooms.length === 0 ? (
                <p className="empty-msg">You haven’t created any rooms yet.</p>
            ) : (
                <div className="room-list">
                    {rooms.map((room) => (
                        <div className="room-card" key={room._id}>
                            <div className="room-info">
                                <h3>{room.name}</h3>
                                <p className="context-preview">Context: {room.context.substring(0, 10)}...</p>
                            </div>
                            <div className="room-actions">
                                <button className="join-btn" onClick={() => onJoin(room)}>Join</button>
                                <button className="delete-btn" onClick={() => onDelete(room._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                    <div className="switch-option">
                        <span>Want to join a room? </span>
                        <button className="link-btn" onClick={onSwitchToJoin}>
                            Browse Rooms
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default RoomsInfoModal;

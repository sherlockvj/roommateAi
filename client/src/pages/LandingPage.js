import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/LandingPage.css";
import landingImage from "../assets/landing.svg";
import CreateRoomModal from "./CreateRoomModal.js";
import RoomsInfoModal from "./RoomsInfoModal.js";
import JoinRoomModal from "./JoinRoomModal.js";
import api from "../api/axios.js";
import { useRooms } from "../contexts/RoomContext.js";

const features = [
  {
    title: "🧑‍🤝‍🧑 Collaborative Rooms",
    description: "Create or join rooms where multiple people can chat together contextually.",
  },
  {
    title: "⚡ Real-time Messaging",
    description: "Instant messaging with seamless AI-human interaction via WebSockets.",
  },
  {
    title: "🧠 AI Role Assistant",
    description: "Assign AI a role like teacher, moderator, or assistant per room for contextual help.",
  },
  {
    title: "🔒 End-to-End Encryption",
    description: "All messages are encrypted securely, ensuring your data stays private within every room.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshRooms, rooms } = useRooms();

  const [user, setUser] = useState(null);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showRoomInfoModal, setShowRoomInfoModal] = useState(false);
  const [showJoinRoomModal, setShowJoinRoomModal] = useState(false);
  const [redirectedRoom, setRedirectedRoom] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: payload.id, name: payload.name || payload.email });
      } catch (err) {
        console.error("Invalid token");
        setUser(null);
      }
    }
  }, []);

  // Show JoinRoomModal if redirected from ProtectedRoute
  useEffect(() => {
    if (location.state?.showJoinModal && location.state.room) {
      setRedirectedRoom(location.state.room);
      setShowJoinRoomModal(true);
    }
  }, [location]);

  const handleOnCreateRoomSubmit = async (roomData) => {
    try {
      await api.post("/room/create", roomData);
      await refreshRooms();
    } catch (e) {
      alert(e.message);
    }
  };

  const handlerOnJoinRoomSubmit = async (roomId) => {
    try {
      await api.post(`/room/join/${roomId}`);
      await refreshRooms();
      navigate(`/chat/${roomId}`);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleOnDeleteRoomSubmit = async (roomId) => {
    try {
      await api.post(`/room/remove/${roomId}`);
      await refreshRooms();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="landing-container">
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-title">roommate.ai</h1>
          <p className="hero-subtitle">Smart. Contextual. Collaborative.</p>

          <div className="hero-buttons">
            {user ? (
              <>
                <button className="hero-btn primary" onClick={() => setShowRoomInfoModal(true)}>
                  Join Room
                </button>
                <button className="hero-btn secondary" onClick={() => setShowCreateRoomModal(true)}>
                  Create Room
                </button>
              </>
            ) : (
              <>
                <button className="hero-btn primary" onClick={() => setShowCreateRoomModal(true)}>
                  Start Chat
                </button>
                <button className="hero-btn secondary" onClick={() => navigate("/login")}>
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img src={landingImage} alt="Hero Vector" className="hero-image" />
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="features-heading">Why roommate.ai?</h2>
        <div className="feature-cards">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <JoinRoomModal
        isOpen={showJoinRoomModal}
        onClose={() => {
          setShowJoinRoomModal(false);
          setRedirectedRoom(null);
        }}
        prefillRoomId={redirectedRoom?._id}
        onJoin={async (roomId) => {
          await handlerOnJoinRoomSubmit(roomId);
          setShowJoinRoomModal(false);
        }}
      />

      <CreateRoomModal
        isOpen={showCreateRoomModal}
        onClose={() => setShowCreateRoomModal(false)}
        onCreate={handleOnCreateRoomSubmit}
        onSwitchToJoin={() => {
          setShowCreateRoomModal(false);
          setShowJoinRoomModal(true);
        }}
      />

      <RoomsInfoModal
        isOpen={showRoomInfoModal}
        onClose={() => setShowRoomInfoModal(false)}
        rooms={rooms}
        onJoin={(room) => {
          navigate(`/chat/${room._id}`);
          setShowRoomInfoModal(false);
        }}
        onSwitchToJoin={() => {
          setShowRoomInfoModal(false);
          setShowJoinRoomModal(true);
        }}
        onDelete={handleOnDeleteRoomSubmit}
      />
    </div>
  );
};

export default LandingPage;

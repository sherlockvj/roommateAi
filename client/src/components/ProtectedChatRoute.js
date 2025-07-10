import { Navigate, useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRooms } from "../contexts/RoomContext";
import api from "../api/axios";
import ChatWindow from "./ChatWindow";
import JoinRoomModal from "../pages/JoinRoomModal";

const ProtectedChatRoute = () => {
  const { user, loadingUser } = useAuth();
  const { rooms, refreshRooms } = useRooms();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [room, setRoom] = useState(null);
  const [notMember, setNotMember] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {

      console.log(user);
      if (!user || !roomId) {
        setChecking(false);
        return;
      }

      try {
        const res = await api.get(`/room/${roomId}`);
        setRoom(res.data.room);

        const isMember = res.data.room.participants.some((userId) => userId == user.id);
        if (!isMember) {
          setNotMember(true);
          setShowJoinModal(true);
          navigate("/", { replace: true, state: { showJoinModal: true, room: res.data.room } });
        }
      } catch (err) {
        console.error("Error checking room access", err);
      } finally {
        setChecking(false);
      }
    };

    checkAccess();
  }, [user, roomId, rooms]);

  if (loadingUser || checking) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to={`/login?redirect=/chat/${roomId}`} replace />;
  }

  if (notMember) {
    return null;
  }

  return <ChatWindow user={user} />;
};

export default ProtectedChatRoute;

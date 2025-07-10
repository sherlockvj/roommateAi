import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

const RoomsContext = createContext();

export const useRooms = () => useContext(RoomsContext);

export const RoomsProvider = ({ children }) => {
    const { user } = useAuth();
    const { showNotification } = useNotification();

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        setLoading(true);

        if (!user) {
            setRooms([]);
            setLoading(false);
            return;
        }

        try {
            const res = await api.get("/room/my", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setRooms(res.data.rooms || []);
        } catch (err) {
            console.error("Failed to fetch rooms", err);
            setRooms([]);
            showNotification("error", "Failed to load your rooms.");
        } finally {
            setLoading(false);
        }
    };

    const refreshRooms = () => fetchRooms();

    useEffect(() => {
        fetchRooms();
    }, [user]);

    return (
        <RoomsContext.Provider value={{ rooms, loading, refreshRooms }}>
            {children}
        </RoomsContext.Provider>
    );
};

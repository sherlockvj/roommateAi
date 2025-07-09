
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";


const RoomsContext = createContext();

export const useRooms = () => useContext(RoomsContext);

export const RoomsProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        try {
            const res = await api.get("/room/my")
            setRooms(res.data.rooms || []);
        } catch (err) {
            console.error("Failed to fetch rooms", err);
        } finally {
            setLoading(false);
        }
    };

    const refreshRooms = () => fetchRooms();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchRooms();
        }
    }, []);

    return (
        <RoomsContext.Provider value={{ rooms, loading, refreshRooms }}>
            {children}
        </RoomsContext.Provider>
    );
};

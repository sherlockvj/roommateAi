import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("SocketProvider token:", token);
        if (!token) return;

        const newSocket = io("http://localhost:5000", {
            auth: { token },
            transports: ["websocket"],
        });

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                console.log("new socket")
                newSocket.disconnect();
            }
        };
    }, [localStorage.getItem("token")]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

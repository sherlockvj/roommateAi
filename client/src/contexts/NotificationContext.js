import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((type, message, timeout = 4000) => {
        const id = Date.now();
        const newNotification = { id, type, message };
        setNotifications((prev) => [...prev, newNotification]);

        // Auto-dismiss after timeout
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, timeout);
    }, []);

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="notification-container">
                {notifications.map((n) => (
                    <div key={n.id} className={`notification ${n.type}`}>
                        <span>{n.message}</span>
                        <button onClick={() => removeNotification(n.id)}>×</button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

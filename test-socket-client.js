import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    auth: {
        token: "JWT_TOKEN"
    }
});

socket.on("connect", () => {
    console.log("✅ Connected to socket server");

    const roomId = "6868b9f4d1afeae22a0c9ece";
    const user = {
        _id: "6867fa349376f84f6e2a5181",
        name: "Vishal"
    };

    socket.emit("joinRoom", { roomId });

    setTimeout(() => {
        socket.emit("sendMessage", {
            roomId,
            message: "@ai Can you help explain recursion?"
        });
        console.log("📤 Message sent to AI");
    }, 500);
});

socket.on("receiveMessage", (msg) => {
    console.log("📥 Message received:", msg);
});

socket.on("userJoined", (data) => {
    console.log("👤 User joined:", data);
});

socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
});

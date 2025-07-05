import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    transports: ["websocket"],
});

socket.on("connect", () => {
    console.log("✅ Connected to socket server");

    socket.emit("joinRoom", {
        roomId: "6868b9f4d1afeae22a0c9ece",
        user: {
            _id: "6867fa349376f84f6e2a5181",
            name: "Vishal"
        }
    });

    console.log("Joined the room")

    socket.emit("sendMessage", {
        roomId: "6868b9f4d1afeae22a0c9ece",
        message: "@ai Can you help explain recursion?"
    });

    console.log("Message Sent to AI")
});

socket.on("receiveMessage", (msg) => {
    console.log("📥 Message received:", msg);
});

socket.on("userJoined", (data) => {
    console.log("👤 User joined:", data);
});

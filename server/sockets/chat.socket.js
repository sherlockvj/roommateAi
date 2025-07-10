import { ObjectId } from 'mongodb';

import { generateOpenAIResponse } from '../services/openai.service.js';
import { saveMessageToRoom } from '../services/message.service.js';
import { getRoomById } from '../services/room.service.js';

const chatSocketHandler = (socket, io) => {
    console.log(` Socket connected: ${socket.id}`);
    // --- 1. JOIN ROOM ---
    socket.on("joinRoom", async ({ roomId }) => {
        const user = socket.data.user;
        try {
            if (!roomId || !ObjectId.isValid(roomId)) {
                return socket.emit("error", { message: "Invalid room ID" });
            }

            const room = await getRoomById(roomId);
            if (!room) {
                return socket.emit("error", { message: "Room does not exist" });
            }

            socket.join(roomId);

            io.to(roomId).emit("userJoined", {
                user: { _id: user.id, name: user.name },
            });
        } catch (err) {
            console.error("joinRoom error:", err.message);
            socket.emit("error", { message: "Failed to join room" });
        }
    });


    // --- 2. SEND MESSAGE ---
    socket.on("sendMessage", async ({ roomId, message }) => {
        const user = socket.data.user;
        try {
            if (!message?.trim() || !roomId || !ObjectId.isValid(roomId)) {
                return socket.emit("error", { message: "Invalid message or roomId" });
            }

            const saved = await saveMessageToRoom({
                text: message,
                userId: user.id,
                roomId,
            });

            io.to(roomId).emit("receiveMessage", {
                ...saved,
                user: { _id: user.id, name: user.name },
            });

            // --- 3. Handle @ai Mentions ---
            if (message.trim().toLowerCase().startsWith("@ai")) {
                const aiReply = await generateOpenAIResponse(roomId, message);
                
                const savedAI = await saveMessageToRoom({
                    text: aiReply,
                    userId: process.env.AI_USER_ID,
                    roomId,
                });

                console.log("Ai Response::Saved");

                io.to(roomId).emit("receiveMessage", {
                    ...savedAI,
                    user: { _id: process.env.AI_USER_ID, name: "AI Bot" },
                });
            }
        } catch (err) {
            console.error("sendMessage error:", err.message);
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    // --- 4. NOTIFY ON DISCONNECT (optional) ---
    socket.on("disconnecting", () => {
        const user = socket.data.user;
        const rooms = [...socket.rooms].filter((r) => r !== socket.id);
        rooms.forEach((roomId) => {
            io.to(roomId).emit("userLeft", {
                user: { _id: user.id, name: user.name },
            });
        });
    });
};

export default chatSocketHandler;

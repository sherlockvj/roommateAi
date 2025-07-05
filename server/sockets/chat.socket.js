import { ObjectId } from 'mongodb';

import { saveMessage } from '../services/message.service.js';
import { generateOpenAIResponse } from '../services/openai.service.js';

const chatSocketHandler = (socket, io) => {
    console.log(` Socket connected: ${socket.id}`);
    // Join room
    socket.on('joinRoom', ({ roomId, user }) => {
        console.log("Room Joined On Server!")
        roomId = new ObjectId(roomId);
        socket.join(roomId);
        socket.data.user = user;
        console.log(`User ${user.name} joined room ${roomId}`);
        io.to(roomId).emit('userJoined', { user });
    });


    socket.on('sendMessage', async ({ roomId, message }) => {
        console.log("Send Message Event on Server" + socket.data.user._id)
        roomId = new ObjectId(roomId);
        socket.join(roomId);
        const user = socket.data.user;
        const saved = await saveMessage(roomId, user._id, message, false);
        io.to(roomId).emit('receiveMessage', saved);

        // Trigger AI response if message tagged (e.g., "@ai" or similar)
        if (message.toLowerCase().startsWith('@ai')) {
            const aiReply = await generateOpenAIResponse(roomId, message);
            const savedAI = await saveMessage(roomId, 'ai', aiReply, true);
            io.to(roomId).emit('receiveMessage', savedAI);
        }
    });

    socket.on('disconnect', () => {
        console.log(`❌ Socket disconnected: ${socket.id}`);
    });
};

export default chatSocketHandler;

import dotenv from "dotenv";
import http from 'http';
import { Server } from 'socket.io';

import app from "./app.js";
import { connectDB } from "./config/db.js";
import chatSocketHandler from "./sockets/chat.socket.js";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
    }
});

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        io.on('connection', (socket) => {
            chatSocketHandler(socket, io);
        });
        server.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}/`));
    })
    .catch((err) => {
        console.error("Failed to start server:", err);
        process.exit(1);
    });
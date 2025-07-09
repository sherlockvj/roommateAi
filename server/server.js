import dotenv from "dotenv";
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import app from "./app.js";
import { connectDB } from "./config/db.js";
import chatSocketHandler from "./sockets/chat.socket.js";
import { stringify } from "querystring";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
        return next(new Error("Authentication token missing"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:: " + stringify(decoded))
        socket.data.user = {
            id: decoded.id,
            name: decoded.name || decoded.email,
        };
        next();
    } catch (err) {
        return next(new Error("Authentication failed"));
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
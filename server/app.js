import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import messageRoutes from "./routes/message.routes.js"
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (_, res) => res.status(200).json({ "status": "success", "message": "API is healthy" }));

app.use("/api/auth", authRoutes);
app.use("/api/room/", roomRoutes);
app.use("/api/message", messageRoutes);

app.use(errorHandler);

export default app;
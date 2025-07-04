import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// health check API
app.get("/api/status", (_, res) => res.status(200).json({ "status": "success", "message": "API is healthy" }));

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
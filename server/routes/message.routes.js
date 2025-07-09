import express from "express"
import { getRoomMessages, sendMessage } from "../controllers/message.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/room/:roomId", authenticate, getRoomMessages);
router.post("/send", authenticate, sendMessage);

export default router;
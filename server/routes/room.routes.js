import express from "express"
import { authenticate } from "../middlewares/auth.middleware.js";
import { createRoom, getMyRooms, joinRoom, getRoomInfoById } from '../controllers/room.controller.js';

const router = express.Router();


router.post('/create', authenticate, createRoom);
router.get('/my', authenticate, getMyRooms);
router.post('/join/:roomId', authenticate, joinRoom);
router.get('/:roomId', authenticate, getRoomInfoById);

export default router;
import express from "express"
import { authenticate } from "../middlewares/auth.middleware.js";
import { createRoom, getMyRooms, joinRoom, getRoomInfoById, removeUser } from '../controllers/room.controller.js';

const router = express.Router();

router.get('/my', authenticate, getMyRooms);
router.get('/:roomId', authenticate, getRoomInfoById);

router.post('/create', authenticate, createRoom);
router.post('/join/:roomId', authenticate, joinRoom);
router.post('/remove/:roomId', authenticate, removeUser);

export default router;
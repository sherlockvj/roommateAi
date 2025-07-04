import { ApiError } from "../errors/ApiError.js";
import { createUserRoom, joinAndUpdateRoom, getRoomById, getRoomsByUser } from "../services/room.service.js";

export const createRoom = async (req, res, next) => {
    const { name, context } = req.body;
    const userId = req.user.id;
    try {
        const result = await createUserRoom(name, context, userId);
        res.status(201).json({ success: true, room: { ...result, _id: result.insertedId } });
    } catch (err) {
        console.error(err);
        next(err instanceof ApiError ? err : new ApiError("Something went wrong.", 500));
    }
}

export const joinRoom = async (req, res, next) => {
    const roomId = req.params.roomId;
    const userId = req.user.id;

    try {
        const updatedRoom = await joinAndUpdateRoom(roomId, userId);
        res.status(200).json({ success: true, room: updatedRoom });
    } catch (err) {
        console.error(err);
        next(err instanceof ApiError ? err : new ApiError("Something went wrong.", 500));
    }
}

export const getRoomInfoById = async (req, res, next) => {
    const roomId = req.params.roomId;

    try {
        const room = await getRoomById(roomId);
        res.status(200).json({ success: true, room });
    } catch (err) {
        console.error(err);
        next(err instanceof ApiError ? err : new ApiError("Something went wrong.", 500));
    }
};

export const getMyRooms = async (req, res) => {
    const userId = req.user.id;
    try {
        const rooms = await getRoomsByUser(userId);
        res.status(200).json({ success: true, rooms });
    } catch (err) {
        console.error(err);
        next(err instanceof ApiError ? err : new ApiError("Something went wrong.", 500));
    }
};
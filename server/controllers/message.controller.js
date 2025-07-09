import { ApiError } from "../errors/ApiError.js";
import { getMessagesByRoom, saveMessageToRoom } from "../services/message.service.js";

export const getRoomMessages = async (req, res, next) => {
    const roomId = req.params.roomId;

    try {
        const messages = await getMessagesByRoom(roomId);
        res.status(200).json({ messages });
    } catch (err) {
        next(err);
    }
};

export const sendMessage = async (req, res, next) => {
    const { text, roomId } = req.body;
    const userId = req.user.id;

    if (!text || !roomId) {
        return next(new ApiError("Text and roomId are required", 400));
    }

    try {
        const message = await saveMessageToRoom({ text, roomId, userId });
        res.status(201).json({ message });
    } catch (err) {
        next(err);
    }
};

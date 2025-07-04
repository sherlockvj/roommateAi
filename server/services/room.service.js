import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import { ApiError } from "../errors/ApiError.js";

const COLLECTION_NAME = process.env.MONGODB_ROOMCOLLECTION;

export const createUserRoom = async (name, context, userId) => {
    const db = getDB();
    const trimmedName = name.trim();
    userId = new ObjectId(userId);

    try {
        const existingRoom = await db.collection(COLLECTION_NAME).findOne({
            name: { $regex: new RegExp(`^${trimmedName}$`, 'i') }
        });

        if (existingRoom) {
            throw new ApiError("Room with this name already exists", 400);
        }

        const room = {
            name: trimmedName,
            context: context?.trim() || '',
            createdBy: userId,
            participants: [userId],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return await db.collection(COLLECTION_NAME).insertOne(room);
    } catch (e) {
        if (e instanceof ApiError) throw e;
        throw new ApiError("Something went wrong while creating room", 500);
    }
}

export const joinAndUpdateRoom = async (roomId, userId) => {
    const db = getDB();
    const roomObjectId = new ObjectId(roomId);
    const userObjectId = new ObjectId(userId);

    try {
        const room = await db.collection(COLLECTION_NAME).findOne({ _id: roomObjectId });

        if (!room) {
            throw new ApiError("No room found!", 404);
        }

        const alreadyJoined = room.participants.some(
            id => id.toString() === userObjectId.toString()
        );

        if (alreadyJoined) {
            throw new ApiError("User already joined this room", 400);
        }

        await db.collection(COLLECTION_NAME).updateOne(
            { _id: roomObjectId },
            {
                $push: { participants: userObjectId },
                $set: { updatedAt: new Date() },
            }
        );

        const updatedRoom = await db.collection(COLLECTION_NAME).findOne({ _id: roomObjectId });
        return updatedRoom;
    } catch (e) {
        if (e instanceof ApiError) throw e;
        throw new ApiError("Something went wrong.", 500);
    }
}

export const getRoomById = async (roomId) => {
    roomId = new ObjectId(roomId);
    const db = getDB();
    try {
        const room = await db.collection(COLLECTION_NAME).findOne({ _id: roomId });
        if (!room) {
            throw new ApiError("No room found!", 404);
        }
        return room;
    } catch (e) {
        throw new ApiError("Something went wrong.", 500);
    }
}

export const getRoomsByUser = async (userId) => {
    const db = getDB();
    userId = new ObjectId(userId)
    try {
        const rooms = await db
            .collection(COLLECTION_NAME)
            .find({ participants: userId })
            .toArray();
        return rooms;
    } catch (e) {
        throw new ApiError("Something went wrong.", 500);
    }
}
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import { ApiError } from "../errors/ApiError.js";

const MESSAGE_COLLECTION = process.env.MONGODB_MESSAGECOLLECTION || "messages";
const USER_COLLECTION = process.env.MONGODB_USERCOLLECTION || "users"; 

export const getMessagesByRoom = async (roomId) => {
  const db = getDB();
  try {
    const messages = await db.collection(MESSAGE_COLLECTION)
      .find({ roomId: new ObjectId(roomId) })
      .sort({ createdAt: 1 })
      .toArray();
    return messages;
  } catch (e) {
    throw new ApiError("Failed to fetch messages", 500);
  }
};

export const saveMessageToRoom = async ({ text, userId, roomId }) => {
  const db = getDB();

  const userObjectId = new ObjectId(userId);

  const user = await db.collection(USER_COLLECTION).findOne({ _id: userObjectId });
  if (!user) throw new ApiError("User not found", 404);

  const message = {
    text,
    userId: userObjectId,
    userName: user.name || user.email || "Anonymous",
    roomId: new ObjectId(roomId),
    createdAt: new Date(),
  };

  try {
    const result = await db.collection(MESSAGE_COLLECTION).insertOne(message);
    return { _id: result.insertedId, ...message };
  } catch (e) {
    throw new ApiError("Failed to send message", 500);
  }
};

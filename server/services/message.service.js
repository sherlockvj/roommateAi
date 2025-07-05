import { ObjectId } from 'mongodb';
import { connectDB } from '../config/db.js';

const COLLECTION_NAME = 'messages';

export const saveMessage = async (roomId, senderId, content, isAI = false) => {
  const db = await connectDB();
  const message = {
    roomId: new ObjectId(roomId),
    senderId: isAI ? 'ai' : new ObjectId(senderId),
    content,
    isAI,
    createdAt: new Date()
  };
  const result = await db.collection(COLLECTION_NAME).insertOne(message);
  return { ...message, _id: result.insertedId };
};
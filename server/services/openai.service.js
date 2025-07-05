import axios from "axios";


import { ObjectId } from "mongodb";
import { ApiError } from "../errors/ApiError.js";

const buildOpenAIUrl = () =>
    `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;

export const generateOpenAIResponse = async (roomId, userMessage) => {
    const room = await db.collection('rooms').findOne({ _id: new ObjectId(roomId) });
    if (!room) throw new ApiError("Room not found", 400);

    const systemPrompt = room.context || "You are a helpful assistant.";
    const promptMessage = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage.replace(/^@ai\s*/i, '') }
    ]
    try {
        const response = await axios.post(
            buildOpenAIUrl(),
            {
                messages: promptMessage,
                temperature: 0.9,
                max_tokens: 1500,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.AZURE_OPENAI_KEY,
                },
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (err) {
        console.error("Azure OpenAI error:", err?.response?.data || err.message);
        throw new ApiError("Failed to generate AI response", 500);
    }
}
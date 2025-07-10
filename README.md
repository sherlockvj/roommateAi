# 🤖 RoomMate.AI – Real-time Contextual Chat with Humans + AI

RoomMate.AI is a smart, real-time collaborative chat platform where multiple users can join a room and interact contextually with each other and an AI agent. You can assign a unique role to the AI like `@ai as teacher`, `@ai as assistant`, etc., and it will respond accordingly in the room.

---

## Quick Start – How to Use & Test the Product

> Get chatting in under 2 minutes!

### Step-by-Step:

1. **Register two users**
   - Open [https://roommate-ai.vercel.app/](https://roommate-ai.vercel.app/)
   - Register User A and User B (you can do this in incognito or another browser/device)

2. **User A creates a chat room**
   - After login, click “Create Room”
   - Enter a room name (e.g., `Physics Doubts`)
   - Give room context and set the temperature.
   - A unique Room ID is generated and User A is inside the chat

3. **User B joins the same room**
   - Ask User A to share the URL (e.g., `https://roommate-ai.vercel.app/chat/665cf...`)
   - User B pastes the URL in their browser
   - If not a member, User B will see a modal asking to join
   - After joining, they are inside the same chat room

4. **Start chatting in real-time**
   - Type messages and see them appear instantly for all members in the room
   - Tag the AI in any message using `@ai` to get smart replies:
     - Example: `@ai explain Newton's Second Law`

---

## ✨ Features

- **Collaborative Rooms**: Join or create chat rooms with others in real-time
- **Instant Messaging**: Built with WebSockets (Socket.IO) for ultra-fast updates
- **AI Role Assistant**: Assign contextual AI roles per room (`@ai as teacher`, `@ai as coder`, etc.)
- **End-to-End Encrypted Communication**
- **Beautiful UI**: Clean, modern design with dark-mode-ready styling
- **Notifications**: Dismissible alerts for success/error feedback
- **Auth System**: Email/password login + registration

---

## Tech Stack

- **Frontend**: React, Context API, React Router, Axios, CSS Modules
- **Backend**: Node.js, Express, Socket.IO, MongoDB
- **AI Engine**: Azure OpenAI (GPT)
- **Auth**: JWT-based token authentication
- **Real-time**: Socket.IO with room-specific channels

---

## AI Usage Notes

- The AI will respond to messages prefixed with `@ai`
- The AI can be assigned a context role (e.g., `teacher`, `mentor`, `assistant`) when the room is created
- AI memory is **room-specific**, so context is retained per room

---

## Demo

**Watch how RoomMate.AI works:**

[Watch Demo Video](./assets/demo.mp4)

---

## Feedback or Contributions?

Feel free to open issues or submit PRs if you'd like to improve **RoomMate.AI**!

---
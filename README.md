# 🤖 roommate.ai

**roommate.ai** is a real-time collaborative chat platform where multiple users can join a virtual room and engage in discussions—with an AI agent that behaves according to a custom-defined context. Whether it's a teacher helping with homework or an expert guiding a brainstorm, the AI joins the conversation as a real participant.

---

## Features

- Create or join collaborative chat rooms
- Real-time group messaging with Socket.IO
- Context-aware AI agent per room (e.g., teacher, coach)
- Chat history stored for future reference
- Room-based AI system prompts (customizable)
- Secure user authentication using JWT
- Fully responsive modern UI (React + Tailwind)

---

## Preview

> _(Coming soon)_

---

## Tech Stack

### Frontend
- React.js + Vite
- Socket.IO Client
- Axios

### Backend
- Node.js + Express
- Socket.IO Server
- MongoDB (via Mongoose)
- JWT for auth
- OpenAI / Azure OpenAI API

---

## MVP Features

- [x] User login/signup
- [x] Create & join rooms
- [x] Real-time messaging
- [x] Persistent chat history
- [x] Custom AI behavior per room
- [x] AI responds in chat flow

## Example Use Cases

- **Study Rooms**: AI acts as a teacher while students chat and ask doubts
- **Brainstorming Sessions**: AI behaves like an ideation partner
- **Support Channels**: AI handles common queries, humans join in for complex cases
- **Tutoring Spaces**: Assign an AI per subject to help learners in real time

---

## 🛣️ Roadmap

- [ ] Message threading and reactions  
- [ ] File and image sharing  
- [ ] AI memory per room  
- [ ] Role-based access (admin/mod/user)  
- [ ] Multi-agent AI (e.g., tutor + moderator)

# Tasks Generator – Mini Planning Tool

A full-stack web application that generates structured user stories and engineering tasks from a feature idea using an LLM (Gemini).

Built as part of a technical build assignment.

---

## Live Features

- Fill a feature idea form (goal, users, constraints)
- Generate user stories and engineering tasks using AI
- Edit tasks inline
- Reorder tasks inside groups
- Grouped engineering tasks (frontend, backend, database, devops)
- Save changes
- View last 5 generated specs
- Export as Markdown (copy or download)
- System status page (Backend, DB, LLM health)

---

## Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- shadcn/ui
- React Router
- Axios

### Backend
- Node.js
- Express
- PostgreSQL (Neon)
- Gemini API (LLM)

---

## Architecture

Frontend:
- Component-based architecture
- API abstraction layer
- Page routing (Home, Status)
- Modular spec editor

Backend:
- RESTful API
- JSONB storage for flexible grouped tasks
- Health endpoints for backend, DB, and LLM
- CORS configured for cross-origin frontend

---

##  Setup Instructions

### 1 Clone Repository

git clone <repo-url>
cd project-root


**Backend Setup**
cd backend
npm install
cd backend
npm install

Create .env file:
PORT=3001
DATABASE_URL=your_neon_connection_string
GEMINI_API_KEY=your_gemini_api_key

PORT=3001
DATABASE_URL=your_neon_connection_string
GEMINI_API_KEY=your_gemini_api_key

Run:
npm run dev

**Frontend Setup**
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

Backend runs on:
http://localhost:3001


**Health Endpoints**
/api/health
/api/health/db
/api/health/llm
Accessible via Status page in UI.


**What Is Done**
Core functionality complete
Editing + reordering
Markdown export
System health monitoring
Clean component structure

 **What Is Not Implemented**
Authentication
Multi-user support
Persistent user accounts
Advanced drag-and-drop grouping
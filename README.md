# FocusForge 🚀

### Collaborative AI-Powered Learning Focus Platform

**FocusForge** is a full-stack web application designed to help learners collaboratively focus on a topic for a fixed time window and then automatically transition into an AI-driven exploration phase with curated learning resources.

The platform encourages short-term commitment, peer learning, and guided exploration using modern web technologies and generative AI.

---

## 🧠 Core Idea

1. **Creation:** Users create or join a topic.
2. **Commitment:** Each topic stays open for **24 hours**.
3. **Collaboration:** Maximum **5 users** can join a topic.
4. **Exploration:** After 24 hours:
    * The topic is locked.
    * AI automatically generates learning resources.
    * The topic enters the exploration phase.

---

## 🏗️ Tech Stack

| Component | Technology Used |
| :--- | :--- |
| **Frontend** | Next.js, React, TypeScript (TSX), CSS, React Hooks, Vercel v0 UI |
| **Backend** | Python, FastAPI, Pydantic, Uvicorn |
| **Database** | MongoDB Atlas, PyMongo |
| **AI** | Google Gemini API (`gemini-2.5-flash`) |

---

## 🔐 Environment Variables

Create a `.env` file in the backend root directory and add the following:

`GEMINI_API_KEY=your_google_gemini_api_key`

---

## 🔄 Backend API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/login` | User login using username & password |

### Topics
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/topic` | Create a new focus topic |
| `GET` | `/topics` | List all active topics (Member count, Time left, Status) |
| `POST` | `/topic/join` | Join a topic (must be before 24h deadline) |
| `GET` | `/topic/{topic_text}` | Get full topic details and AI resources |
| `DELETE` | `/topic/{topic_text}` | Delete a topic |

---

## 🤖 AI Resource Generation

When a topic crosses the **24-hour limit**, the system automatically calls the Gemini API to generate:
* 3 YouTube playlists
* 3 Educational websites
* 2 Standard textbooks

*These resources are stored in MongoDB and exposed via the API.*

---

## 🧪 Business Rules Enforced

* ⏱️ **Topic duration:** Strictly 24 hours.
* 👥 **Capacity:** Max 5 members per topic.
* ❌ **Lockout:** No joining after the deadline.
* 🔁 **Uniqueness:** Duplicate topic names are not allowed.
* 🤖 **Efficiency:** AI runs only once per topic (upon closure).

---

## ▶️ Running the Backend Locally

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt

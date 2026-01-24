# FocusForge 🚀

**Collaborative AI-Powered Learning Focus Platform**

FocusForge is a full-stack web application designed to help learners collaboratively focus on a topic for a fixed time window and then automatically transition into an AI-driven exploration phase with curated learning resources.

The platform encourages short-term commitment, peer learning, and guided exploration using modern web technologies and generative AI.

---

## 🧠 Core Idea

* **Users create or join a topic**
* **Each topic stays open for 24 hours**
* **Maximum 5 users can join a topic**
* **After 24 hours:**
    * Topic is locked
    * AI automatically generates learning resources
    * Topic enters exploration phase

---

## 🏗️ Tech Stack

### Frontend
Built using **Vercel v0** with:
* Next.js
* React
* TypeScript (TSX)
* CSS
* React Hooks
* Vercel v0 UI generation

### Backend
* **Python**
* **FastAPI** – REST API framework
* **Pydantic** – Data validation
* **Uvicorn** – ASGI server

### Database
* **MongoDB Atlas**
* **PyMongo** – MongoDB driver

### AI Integration
* **Google Gemini API**
* **Model used:** `gemini-2.5-flash`
* Used for automatic learning resource generation

---

## 🔐 Environment Variables

Create a `.env` file in the backend root:

```env
GEMINI_API_KEY=your_google_gemini_api_key

🔄 Backend API Endpoints
Authentication

POST /login

User login using username & password

Topics

POST /topic

Create a new focus topic

GET /topics

List all active topics with:

Member count

Time left (seconds)

Status

POST /topic/join

Join a topic (before 24h deadline)

GET /topic/{topic_text}

Get full topic details and AI resources

DELETE /topic/{topic_text}

Delete a topic

🤖 AI Resource Generation
When a topic crosses the 24-hour limit:

The system automatically calls Gemini AI

Generates:

3 YouTube playlists

3 educational websites

2 standard textbooks

Resources are stored in MongoDB and exposed via API

🧪 Business Rules Enforced
⏱️ Topic duration: 24 hours

👥 Max members per topic: 5

❌ No joining after deadline

🔁 Duplicate topic names not allowed

🤖 AI runs only once per topic (on closure)

▶️ Running the Backend Locally
Install Dependencies:

Bash
pip install -r requirements.txt
Start the Server:

Bash
uvicorn backend.main:app --reload
Access: Backend runs on: http://localhost:8000

🎯 Future Enhancements
Password hashing & authentication tokens

Topic discussion threads

Notifications before deadline

AI summaries instead of raw text

Deployment with Docker

Role-based access control

👩💻 Author
Trishna Gajjala

B.Tech Computer Science

FocusForge – Full-Stack + AI Project

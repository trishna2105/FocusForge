
# 🚀 FocusForge

### Collaborative AI-Powered Learning Focus Platform

**FocusForge** is a full-stack web application designed to help learners collaboratively focus on a topic for a fixed time window and then automatically transition into an AI-driven exploration phase with curated learning resources.

The platform encourages **short-term commitment**, **peer learning**, and **guided exploration** using modern web technologies and generative AI.

---

## 🧠 Core Idea

* Users create or join a topic
* Each topic stays open for **24 hours**
* **Maximum 5 users** can join a topic

### After 24 hours:

* 🔒 Topic is locked
* 🤖 AI automatically generates learning resources
* 🔍 Topic enters exploration phase

---

## 🏗️ Tech Stack

### Frontend

Built using **Vercel v0**, with:

* Next.js
* React
* TypeScript (TSX)
* CSS
* React Hooks
* Vercel v0 UI generation

### Backend

* Python
* FastAPI – REST API framework
* Pydantic – Data validation
* Uvicorn – ASGI server

### Database

* MongoDB Atlas
* PyMongo – MongoDB driver

### AI Integration

* Google Gemini API
* **Model used:** `gemini-2.5-flash`
* Used for automatic learning resource generation

---

## 🔐 Environment Variables

Create a `.env` file in the backend root:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 🔄 Backend API Endpoints & Authentication

### 🔑 Authentication

| Method | Endpoint | Description                          |
| ------ | -------- | ------------------------------------ |
| POST   | `/login` | User login using username & password |

---

### 📚 Topics API

| Method | Endpoint              | Description                                              |
| ------ | --------------------- | -------------------------------------------------------- |
| POST   | `/topic`              | Create a new focus topic                                 |
| GET    | `/topics`             | List all active topics (member count, time left, status) |
| POST   | `/topic/join`         | Join a topic (must be before 24h deadline)               |
| GET    | `/topic/{topic_text}` | Get full topic details and AI resources                  |
| DELETE | `/topic/{topic_text}` | Delete a topic                                           |

---

## 🤖 AI Resource Generation

When a topic crosses the **24-hour limit**, the system automatically calls the **Gemini API** to generate:

* 🎥 **3 YouTube playlists**
* 🌐 **3 Educational websites**
* 📘 **2 Standard textbooks**

These resources are:

* Stored in **MongoDB**
* Exposed via the backend API

---

## 🧪 Business Rules Enforced

* ⏱️ **Topic Duration:** Strictly 24 hours
* 👥 **Capacity:** Maximum 5 members per topic
* ❌ **Lockout:** No joining after deadline
* 🔁 **Uniqueness:** Duplicate topic names not allowed
* 🤖 **Efficiency:** AI runs only once per topic (upon closure)

---

## ▶️ Running the Backend Locally

### 1️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 2️⃣ Start the Server

```bash
uvicorn backend.main:app --reload
```

The backend will run on:

```
http://localhost:8000
```

---
## 📸 Screenshots
<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/ba9a8b47-7cb6-4af0-93b4-3115a02d6f8a" width="500"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/55071b8b-09b9-4dc6-98c9-b1b0e5443504" width="500"/>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/d495eb2e-5590-4af7-87c0-5246a159dda5" width="500"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/5b903349-f564-4066-8cae-4add345d87b3" width="500"/>
    </td>
  </tr>
</table>

---

## 🎯 Future Enhancements

* [ ] Password hashing & authentication tokens
* [ ] Topic discussion threads
* [ ] Notifications before deadline
* [ ] AI summaries instead of raw text
* [ ] Deployment with Docker
* [ ] Role-based access control

---

## 👩‍💻 Author

**Trishna Gajjala**
B.Tech – Computer Science

**FocusForge** – Full-Stack + AI Project 🚀



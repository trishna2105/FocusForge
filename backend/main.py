from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta

from backend.database import topic_collection, user_collection
from backend.ai.recommender import generate_resources

app = FastAPI()

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- MODELS ----------
class LoginData(BaseModel):
    username: str
    password: str

class TopicCreate(BaseModel):
    text: str

class JoinRequest(BaseModel):
    topic: str
    user: str


# ---------- ROUTES ----------
@app.get("/")
def hello():
    return {"Hello": "World"}


# ---------- LOGIN ----------
@app.post("/login")
def login(data: LoginData):
    user = user_collection.find_one({
        "username": data.username,
        "password": data.password
    })

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "user": data.username}


# ---------- CREATE TOPIC ----------
@app.post("/topic")
def create_topic(topic: TopicCreate):
    existing = topic_collection.find_one({"text": topic.text})
    if existing:
        raise HTTPException(status_code=400, detail="Topic already exists")

    new_topic = {
        "text": topic.text,
        "members": [],
        "created_at": datetime.utcnow(),
        "status": "active",
        "resources": None
    }

    result = topic_collection.insert_one(new_topic)

    return {
        "id": str(result.inserted_id),
        "text": new_topic["text"],
        "members": [],
        "created_at": new_topic["created_at"].isoformat(),
        "status": "active",
        "resources": None
    }


# ---------- LIST TOPICS ----------
@app.get("/topics")
def list_topics():
    topics = []
    for t in topic_collection.find():
        time_left = max(
            0,
            int((t["created_at"] + timedelta(hours=24) - datetime.utcnow()).total_seconds())
        )

        topics.append({
            "id": str(t["_id"]),
            "text": t["text"],
            "members": len(t["members"]),
            "time_left": time_left,
            "status": t["status"]
        })
    return topics


# ---------- JOIN TOPIC ----------
@app.post("/topic/join")
def join_topic(data: JoinRequest):
    topic = topic_collection.find_one({"text": data.topic})
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    created_at = topic["created_at"].replace(tzinfo=None)
    now = datetime.utcnow()

    # ⏱️ Deadline check (24h)
    if now - created_at > timedelta(hours=24):
        if topic["status"] == "active":
            resources = generate_resources(topic["text"])
            topic_collection.update_one(
                {"_id": topic["_id"]},
                {"$set": {"status": "closed", "resources": resources}}
            )
        raise HTTPException(
            status_code=403,
            detail="Deadline ended. Topic is now in exploration phase."
        )

    # 👥 Max 5 members
    if len(topic["members"]) >= 5:
        raise HTTPException(status_code=400, detail="Topic is full")

    if data.user in topic["members"]:
        raise HTTPException(status_code=400, detail="User already joined")

    topic_collection.update_one(
        {"_id": topic["_id"]},
        {"$push": {"members": data.user}}
    )

    return {"message": "Joined successfully"}


# ---------- DELETE TOPIC ----------
@app.delete("/topic/{topic_text}")
def delete_topic(topic_text: str):
    result = topic_collection.find_one_and_delete({"text": topic_text})
    if not result:
        raise HTTPException(status_code=404, detail="Topic not found")

    return {"message": "Topic deleted"}


# ---------- TOPIC DETAILS ----------
@app.get("/topic/{topic_text}")
def get_topic_details(topic_text: str):
    topic = topic_collection.find_one({"text": topic_text})
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    return {
        "text": topic["text"],
        "members": topic["members"],
        "created_at": topic["created_at"].isoformat(),
        "status": topic["status"],
        "resources": topic["resources"]
    }

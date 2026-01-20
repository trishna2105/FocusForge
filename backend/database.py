from pymongo import MongoClient
from urllib.parse import quote_plus

username = "focusforge9"
password = "xxxx"
encoded_password = quote_plus(password)


MONGO_URL = f"mongodb+srv://{username}:{encoded_password}@cluster1.dbtagkq.mongodb.net/?appName=Cluster1"

client = MongoClient(MONGO_URL)

db = client["focusforge_db"]

user_collection = db["users"]
topic_collection = db["topics"]

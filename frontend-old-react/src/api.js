import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const login = (data) => API.post("/login", data);
export const createTopic = (data) => API.post("/topic", data);
export const getTopics = () => API.get("/topics");
export const joinTopic = (data) => API.post("/topic/join", data);
export const getTopicDetails = (topic) => API.get(`/topic/${topic}`);

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = () => api.get("/tasks");

export const createTask = (task) => api.post("/tasks", task);

export const updateTask = (id, task) =>
  api.put(`/tasks/${id}`, task);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);
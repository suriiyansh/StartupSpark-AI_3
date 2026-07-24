import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 30000,
});

export async function validateIdea(idea) {
  const response = await api.post("/validate-idea", { idea });
  return response.data.data;
}
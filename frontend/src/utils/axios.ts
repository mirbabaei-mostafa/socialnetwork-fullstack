import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "http://localhost:8001",
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8001",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { CanceledError };

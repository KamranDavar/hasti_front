import axios from "axios";

export const jsonServerApi = axios.create({
  baseURL: "http://localhost:3004/",
});

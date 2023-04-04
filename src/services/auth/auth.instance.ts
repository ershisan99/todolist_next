import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/auth/",
  withCredentials: true,
});

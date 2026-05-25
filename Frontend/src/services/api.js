import axios from "axios";

const API = axios.create({
  baseURL: "https://colitis-assistant-tool-y6ps.vercel.app/api"
});
export default API;
import axios from "axios";

//axious blueprint for further uses
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
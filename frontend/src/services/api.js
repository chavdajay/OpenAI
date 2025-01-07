import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const createUser = (userData) => axios.post(API_URL, userData);
export const fetchUsers = () => axios.get(API_URL);
export const chatWithOpenAI = (prompt) => axios.post(`${API_URL}/chat`, { prompt });

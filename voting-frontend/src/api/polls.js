import axios from 'axios';

const API_URL = "http://localhost:8000"; 

export const createPoll = (data) => axios.post(`${API_URL}/polls/`, data);

export const getPoll = (id) => axios.get(`${API_URL}/polls/${id}/`);

export const vote = (id, option_id) =>
  axios.post(`${API_URL}/polls/${id}/vote/`, { option_id });

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchThreats = (page = 1, limit = 10) =>
  API.get(`/threats?page=${page}&limit=${limit}`);

export const fetchThreatById = (id) =>
  API.get(`/threats/${id}`);

export const fetchStats = () =>
  API.get(`/threats/stats`);

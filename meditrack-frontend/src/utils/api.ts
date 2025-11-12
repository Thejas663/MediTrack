import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
};

export const reminderAPI = {
  getReminders: (params?: any) => api.get('/reminders', { params }),
  createReminder: (data: any) => api.post('/reminders', data),
  updateReminder: (id: string, data: any) => api.put(`/reminders/${id}`, data),
  deleteReminder: (id: string) => api.delete(`/reminders/${id}`),
};

export default api;
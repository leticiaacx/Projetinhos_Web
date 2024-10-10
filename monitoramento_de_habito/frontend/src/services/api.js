import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/login`, userData);
};

export const createHabit = async (habitData, token) => {
    return await axios.post(`${API_URL}/habits`, habitData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getHabits = async (token) => {
    return await axios.get(`${API_URL}/habits`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateHabit = async (habitId, habitData, token) => {
    return await axios.put(`${API_URL}/habits/${habitId}`, habitData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteHabit = async (habitId, token) => {
    return await axios.delete(`${API_URL}/habits/${habitId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

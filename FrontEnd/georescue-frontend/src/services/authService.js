import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const handleAuthCallback = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/auth/success`);
    const { token, email, name, picture } = response.data;
    
    // Store the token and user info
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ email, name, picture }));
    
    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
}; 
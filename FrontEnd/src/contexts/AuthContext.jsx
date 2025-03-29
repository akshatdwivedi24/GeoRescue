import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/api/user/current');
      setUser(response.data);
      
      // Only redirect if we're on the login page and have a user
      if (location.pathname === '/login' && response.data) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      
      // Only redirect to login if we're not already there and not in the OAuth flow
      if (location.pathname !== '/login' && 
          !location.pathname.startsWith('/oauth2/') && 
          !location.pathname.startsWith('/login/oauth2/') && 
          !location.pathname.startsWith('/error')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]);

  const login = () => {
    // Redirect to Spring OAuth2 endpoint with state parameter
    const state = Math.random().toString(36).substring(7);
    sessionStorage.setItem('oauth2_state', state);
    window.location.href = `http://localhost:8081/oauth2/authorization/google?state=${state}`;
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      sessionStorage.removeItem('oauth2_state');
      navigate('/login');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 
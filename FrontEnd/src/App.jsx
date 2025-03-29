import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Incidents from './pages/Incidents';
import Shelters from './pages/Shelters';
import RescueOperations from './pages/RescueOperations';
import EmergencyContacts from './pages/EmergencyContacts';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Theme wrapper component
const ThemeWrapper = ({ children }) => {
  const { darkMode } = useTheme();
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#dc004e',
        light: '#ff4081',
        dark: '#c51162',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Router>
          <AuthProvider>
            <div className="app">
              <Navbar />
              <div className="main-content">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/map" element={
                    <ProtectedRoute>
                      <Map />
                    </ProtectedRoute>
                  } />
                  <Route path="/incidents" element={
                    <ProtectedRoute>
                      <Incidents />
                    </ProtectedRoute>
                  } />
                  <Route path="/shelters" element={
                    <ProtectedRoute>
                      <Shelters />
                    </ProtectedRoute>
                  } />
                  <Route path="/rescue-operations" element={
                    <ProtectedRoute>
                      <RescueOperations />
                    </ProtectedRoute>
                  } />
                  <Route path="/emergency-contacts" element={
                    <ProtectedRoute>
                      <EmergencyContacts />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthProvider>
        </Router>
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App; 
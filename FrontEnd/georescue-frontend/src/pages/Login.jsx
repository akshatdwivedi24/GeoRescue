import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }

    // Check for error parameter
    const params = new URLSearchParams(location.search);
    const error = params.get('error');
    if (error) {
      console.error('Authentication error:', error);
    }
  }, [navigate, location]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            GeoRescue
          </Typography>
          <Typography component="h2" variant="h6" gutterBottom color="textSecondary">
            Disaster Management System
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#fff',
                color: '#757575',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                textTransform: 'none',
                display: 'flex',
                gap: 1,
              }}
              onClick={handleGoogleLogin}
            >
              <GoogleIcon sx={{ color: '#4285f4' }} />
              Sign in with Google
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login; 
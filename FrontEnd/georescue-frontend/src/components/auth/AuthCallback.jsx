import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Container, Box } from '@mui/material';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');

    if (token && email) {
      // Store user information
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ name, email }));
      
      // Redirect to dashboard
      navigate('/', { replace: true });
    } else {
      // Handle error case
      console.error('Missing authentication data');
      navigate('/login', { replace: true });
    }
  }, [navigate, location]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
}

export default AuthCallback; 
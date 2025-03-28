import React from 'react';
import { Container, Typography } from '@mui/material';

const Shelters = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shelters
      </Typography>
      <Typography paragraph>
        Shelter locations and management system coming soon...
      </Typography>
    </Container>
  );
};

export default Shelters; 
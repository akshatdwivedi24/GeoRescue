import React from 'react';
import { Container, Typography } from '@mui/material';

const Incidents = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Incidents
      </Typography>
      <Typography paragraph>
        Incident management and reporting system coming soon...
      </Typography>
    </Container>
  );
};

export default Incidents; 
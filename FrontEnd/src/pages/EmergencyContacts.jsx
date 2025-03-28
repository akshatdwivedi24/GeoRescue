import React from 'react';
import { Container, Typography } from '@mui/material';

const EmergencyContacts = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Emergency Contacts
      </Typography>
      <Typography paragraph>
        Emergency contacts management system coming soon...
      </Typography>
    </Container>
  );
};

export default EmergencyContacts; 
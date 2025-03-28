import { Container, Typography, Box } from '@mui/material';

function EmergencyContacts() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emergency Contacts
        </Typography>
        <Typography variant="body1" paragraph>
          Manage emergency contact information and communication channels.
        </Typography>
      </Box>
    </Container>
  );
}

export default EmergencyContacts; 
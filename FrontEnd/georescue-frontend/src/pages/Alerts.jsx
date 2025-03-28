import { Container, Typography, Box } from '@mui/material';

function Alerts() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Alerts Management
        </Typography>
        <Typography variant="body1" paragraph>
          View and manage emergency alerts in your area.
        </Typography>
      </Box>
    </Container>
  );
}

export default Alerts; 
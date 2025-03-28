import { Container, Typography, Box } from '@mui/material';

function Incidents() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Incidents Management
        </Typography>
        <Typography variant="body1" paragraph>
          Track and manage emergency incidents and responses.
        </Typography>
      </Box>
    </Container>
  );
}

export default Incidents; 
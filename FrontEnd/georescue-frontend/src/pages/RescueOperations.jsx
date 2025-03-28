import { Container, Typography, Box } from '@mui/material';

function RescueOperations() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rescue Operations
        </Typography>
        <Typography variant="body1" paragraph>
          Coordinate and monitor rescue operations and emergency response teams.
        </Typography>
      </Box>
    </Container>
  );
}

export default RescueOperations; 
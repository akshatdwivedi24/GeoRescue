import { Container, Typography, Box } from '@mui/material';

function Shelters() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emergency Shelters
        </Typography>
        <Typography variant="body1" paragraph>
          Locate and manage emergency shelters and safe zones.
        </Typography>
      </Box>
    </Container>
  );
}

export default Shelters; 
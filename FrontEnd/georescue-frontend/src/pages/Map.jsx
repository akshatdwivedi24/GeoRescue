import { Container, Typography, Box } from '@mui/material';

function Map() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emergency Map
        </Typography>
        <Typography variant="body1" paragraph>
          View and track emergency situations on an interactive map.
        </Typography>
      </Box>
    </Container>
  );
}

export default Map; 
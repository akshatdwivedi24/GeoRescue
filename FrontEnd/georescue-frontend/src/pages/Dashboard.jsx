import { Container, Typography, Box } from '@mui/material';

function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to GeoRescue
        </Typography>
        <Typography variant="body1" paragraph>
          Your comprehensive disaster management system. Use the navigation menu to access different features and manage emergency responses effectively.
        </Typography>
      </Box>
    </Container>
  );
}

export default Dashboard; 
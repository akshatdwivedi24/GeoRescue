import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  NotificationsActive as AlertIcon,
  Help as HelpIcon,
  People as VolunteerIcon,
  Report as ReportIcon,
  Home as ShelterIcon,
  LocalHospital as MedicalIcon,
  School as EducationIcon,
  Person as PersonIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Language as LanguageIcon,
  Brightness4 as DarkModeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, onClick }) => (
  <Card 
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6,
      },
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h6" ml={1}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random/?natural-disaster)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.6)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', py: 6 }}>
          <Typography
            component="h1"
            variant={isMobile ? 'h3' : 'h2'}
            color="inherit"
            gutterBottom
          >
            GeoRescue: Your Disaster Management Hub
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Stay Informed. Stay Safe. Act Fast.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="error"
              size="large"
              startIcon={<AlertIcon />}
              onClick={() => navigate('/alerts')}
            >
              Get Real-Time Alerts
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="large"
              startIcon={<HelpIcon />}
              onClick={() => navigate('/help')}
            >
              Request Assistance
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<VolunteerIcon />}
              onClick={() => navigate('/volunteer')}
            >
              Join as Volunteer
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Our Services
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceCard
              icon={<ReportIcon fontSize="large" color="error" />}
              title="Emergency Reporting"
              description="Report disasters and get immediate assistance from emergency responders."
              onClick={() => navigate('/report')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceCard
              icon={<ShelterIcon fontSize="large" color="primary" />}
              title="Shelter Finder"
              description="Locate nearby emergency shelters and safe zones in your area."
              onClick={() => navigate('/shelters')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceCard
              icon={<VolunteerIcon fontSize="large" color="success" />}
              title="Volunteer Coordination"
              description="Join local relief efforts and make a difference in your community."
              onClick={() => navigate('/volunteer')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceCard
              icon={<MedicalIcon fontSize="large" color="error" />}
              title="Medical Assistance"
              description="Find nearby hospitals and emergency medical services."
              onClick={() => navigate('/medical')}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Community Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Community & Support
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Missing Persons
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Report or search for missing individuals during disasters.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/missing-persons')}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Request Aid
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Submit requests for emergency supplies or assistance.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/request-aid')}
                  >
                    Request Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Volunteer Network
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Connect with local volunteers and response teams.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/volunteer-network')}
                  >
                    Join Network
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Donation Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Paper
          sx={{
            p: 4,
            bgcolor: theme.palette.primary.main,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Support Disaster Relief
          </Typography>
          <Typography variant="body1" paragraph>
            Your contribution can make a real difference. ₹1,000 can provide food and water for a family for a week.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/donate')}
          >
            Donate Now
          </Button>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                About GeoRescue
              </Typography>
              <Typography variant="body2">
                A comprehensive disaster management platform dedicated to saving lives and coordinating relief efforts.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Emergency Contacts
              </Typography>
              <Typography variant="body2">
                National Emergency: 112<br />
                Ambulance: 108<br />
                Fire: 101<br />
                Police: 100
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Connect With Us
              </Typography>
              <Box>
                <IconButton color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">
              © 2024 GeoRescue. All rights reserved.
            </Typography>
            <Box>
              <IconButton color="inherit" title="Change Language">
                <LanguageIcon />
              </IconButton>
              <IconButton color="inherit" title="Toggle Dark Mode">
                <DarkModeIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 
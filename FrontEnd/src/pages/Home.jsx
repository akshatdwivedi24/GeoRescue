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
  Divider,
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
  Search as SearchIcon,
  Handshake as HandshakeIcon,
  Groups as GroupsIcon,
  AccountBalance as DonationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EmergencyReport from '../components/emergency/EmergencyReport';
import ShelterFinder from '../components/shelter/ShelterFinder';
import MissingPersonFinder from '../components/missing/MissingPersonFinder';
import DonationManager from '../components/donation/DonationManager';

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
      <Box 
        display="flex" 
        alignItems="flex-start" 
        mb={2}
        sx={{ minHeight: '48px' }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          width: '40px',
          height: '40px',
          mr: 2,
          flexShrink: 0
        }}>
          {icon}
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            lineHeight: 1.2,
            pt: 0.5
          }}
        >
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

      {/* Emergency Reporting Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Emergency Reporting
        </Typography>
        <EmergencyReport />
      </Container>

      <Divider sx={{ my: 6 }} />

      {/* Shelter Finder Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Find Nearby Shelters
        </Typography>
        <ShelterFinder />
      </Container>

      <Divider sx={{ my: 6 }} />

      {/* Missing Person Finder Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Missing Person Finder
        </Typography>
        <MissingPersonFinder />
      </Container>

      <Divider sx={{ my: 6 }} />

      {/* Donation & Relief Funds Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Donation & Relief Funds
        </Typography>
        <DonationManager />
      </Container>

      {/* Community Section */}
      <Box sx={{ 
        bgcolor: theme.palette.background.default,
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Community & Support
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                bgcolor: theme.palette.background.paper,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <SearchIcon fontSize="large" color="info" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Missing Persons
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Report or search for missing individuals during disasters.
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/missing-persons')}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                bgcolor: theme.palette.background.paper,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <HandshakeIcon fontSize="large" color="success" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Volunteer Opportunities
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Join our community of volunteers and make a difference.
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/volunteer')}
                  >
                    Get Involved
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                bgcolor: theme.palette.background.paper,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <DonationIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Support Relief Efforts
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Contribute to disaster relief and recovery initiatives.
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/donate')}
                  >
                    Donate Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        bgcolor: theme.palette.background.paper,
        py: 4,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                About GeoRescue
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A comprehensive disaster management system helping communities stay safe and connected during emergencies.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button color="inherit" onClick={() => navigate('/about')}>About Us</Button>
                <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
                <Button color="inherit" onClick={() => navigate('/faq')}>FAQ</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
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
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 
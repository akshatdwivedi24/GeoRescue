import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Button,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as LocalHospitalIcon,
  Warning as WarningIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Group as GroupIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, color, onClick }) => (
  <Card sx={{ height: '100%', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: '50%',
            padding: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('/api/dashboard/statistics', {
          withCredentials: true
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  const weeklyIncidentsData = statistics?.weeklyIncidents 
    ? Object.entries(statistics.weeklyIncidents).map(([day, count]) => ({
        day,
        incidents: count
      }))
    : [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to GeoRescue
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Your trusted platform for emergency response and disaster management.
          We help coordinate rescue operations, manage shelters, and save lives.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/map')}
        >
          View Emergency Map
        </Button>
      </Paper>

      {/* Statistics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Incidents"
            value={statistics?.activeIncidents}
            icon={<WarningIcon sx={{ color: theme.palette.error.main }} />}
            color={theme.palette.error.main}
            onClick={() => navigate('/incidents')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Rescue Operations"
            value={statistics?.rescueOperations}
            icon={<LocalHospitalIcon sx={{ color: theme.palette.success.main }} />}
            color={theme.palette.success.main}
            onClick={() => navigate('/rescue-operations')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Available Shelters"
            value={statistics?.availableShelters}
            icon={<HomeIcon sx={{ color: theme.palette.info.main }} />}
            color={theme.palette.info.main}
            onClick={() => navigate('/shelters')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="People Helped"
            value={statistics?.peopleHelped}
            icon={<PeopleIcon sx={{ color: theme.palette.warning.main }} />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Emergency Contacts"
            value={statistics?.emergencyContacts}
            icon={<PhoneIcon sx={{ color: theme.palette.secondary.main }} />}
            color={theme.palette.secondary.main}
            onClick={() => navigate('/emergency-contacts')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Volunteers"
            value={statistics?.activeVolunteers}
            icon={<GroupIcon sx={{ color: theme.palette.primary.main }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
      </Grid>

      {/* Charts and Additional Info */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Weekly Incident Trends
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyIncidentsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Response Metrics
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Average Response Time:
                <Typography component="span" variant="h6" sx={{ ml: 1, color: theme.palette.success.main }}>
                  {statistics?.responseMetrics?.averageResponseTime}
                </Typography>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Fastest Response:
                <Typography component="span" variant="h6" sx={{ ml: 1, color: theme.palette.info.main }}>
                  {statistics?.responseMetrics?.fastestResponse}
                </Typography>
              </Typography>
              <Typography variant="body1">
                Total Responses:
                <Typography component="span" variant="h6" sx={{ ml: 1, color: theme.palette.primary.main }}>
                  {statistics?.responseMetrics?.totalResponses}
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Safety Information */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Safety Measures & Guidelines
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary">
              Emergency Preparedness
            </Typography>
            <Typography variant="body1">
              • Keep emergency contacts handy<br />
              • Maintain emergency supplies<br />
              • Know evacuation routes<br />
              • Stay informed about weather
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary">
              During Emergency
            </Typography>
            <Typography variant="body1">
              • Stay calm and assess situation<br />
              • Contact emergency services<br />
              • Follow official instructions<br />
              • Help others if safe to do so
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary">
              After Emergency
            </Typography>
            <Typography variant="body1">
              • Check for injuries<br />
              • Document damages<br />
              • Contact insurance<br />
              • Support community recovery
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard; 
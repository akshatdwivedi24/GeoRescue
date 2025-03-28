import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import {
  Warning,
  Report,
  Home,
  Emergency,
  Phone,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const StatCard = ({ title, value, icon, trend, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            p: 1,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {trend > 0 ? (
          <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
        ) : (
          <TrendingDown sx={{ color: 'error.main', mr: 1 }} />
        )}
        <Typography
          variant="body2"
          color={trend > 0 ? 'success.main' : 'error.main'}
        >
          {Math.abs(trend)}% from last week
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

function Dashboard() {
  const [stats, setStats] = useState({
    activeAlerts: 0,
    activeIncidents: 0,
    availableShelters: 0,
    activeOperations: 0,
    emergencyContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alertsRes, incidentsRes, sheltersRes, operationsRes, contactsRes] = await Promise.all([
          axios.get('/api/alerts/active'),
          axios.get('/api/incidents/active'),
          axios.get('/api/shelters/available'),
          axios.get('/api/rescue-operations/active'),
          axios.get('/api/emergency-contacts'),
        ]);

        setStats({
          activeAlerts: alertsRes.data.length,
          activeIncidents: incidentsRes.data.length,
          availableShelters: sheltersRes.data.length,
          activeOperations: operationsRes.data.length,
          emergencyContacts: contactsRes.data.length,
        });
      } catch (error) {
        toast.error('Error fetching dashboard data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Active Alerts"
            value={stats.activeAlerts}
            icon={<Warning sx={{ color: 'warning.main' }} />}
            trend={5}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Active Incidents"
            value={stats.activeIncidents}
            icon={<Report sx={{ color: 'error.main' }} />}
            trend={-2}
            color="error"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Available Shelters"
            value={stats.availableShelters}
            icon={<Home sx={{ color: 'success.main' }} />}
            trend={8}
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Active Operations"
            value={stats.activeOperations}
            icon={<Emergency sx={{ color: 'info.main' }} />}
            trend={3}
            color="info"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Emergency Contacts"
            value={stats.emergencyContacts}
            icon={<Phone sx={{ color: 'secondary.main' }} />}
            trend={0}
            color="secondary"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 
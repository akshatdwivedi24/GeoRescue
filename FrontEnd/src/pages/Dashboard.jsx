import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  Warning as AlertIcon,
  Report as IncidentIcon,
  LocalHospital as ShelterIcon,
  LocalPolice as RescueIcon,
  Contacts as ContactIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const StatCard = ({ title, value, icon, trend, color }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography color="textSecondary" variant="h6" component="div">
        {title}
      </Typography>
      <Box
        sx={{
          backgroundColor: `${color}15`,
          borderRadius: '50%',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
    </Box>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
    <Typography color="textSecondary" sx={{ flex: 1, mt: 1 }}>
      {trend}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeAlerts: 0,
    totalIncidents: 0,
    availableShelters: 0,
    activeOperations: 0,
    emergencyContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          alertsRes,
          incidentsRes,
          sheltersRes,
          operationsRes,
          contactsRes,
        ] = await Promise.all([
          axios.get('/api/alerts/count'),
          axios.get('/api/incidents/count'),
          axios.get('/api/shelters/count'),
          axios.get('/api/rescue-operations/count'),
          axios.get('/api/emergency-contacts/count'),
        ]);

        setStats({
          activeAlerts: alertsRes.data,
          totalIncidents: incidentsRes.data,
          availableShelters: sheltersRes.data,
          activeOperations: operationsRes.data,
          emergencyContacts: contactsRes.data,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Alerts"
            value={stats.activeAlerts}
            icon={<AlertIcon sx={{ color: '#f44336' }} />}
            trend="Last 24 hours"
            color="#f44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Incidents"
            value={stats.totalIncidents}
            icon={<IncidentIcon sx={{ color: '#ff9800' }} />}
            trend="This month"
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Available Shelters"
            value={stats.availableShelters}
            icon={<ShelterIcon sx={{ color: '#4caf50' }} />}
            trend="Currently active"
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StatCard
            title="Active Operations"
            value={stats.activeOperations}
            icon={<RescueIcon sx={{ color: '#2196f3' }} />}
            trend="In progress"
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StatCard
            title="Emergency Contacts"
            value={stats.emergencyContacts}
            icon={<ContactIcon sx={{ color: '#9c27b0' }} />}
            trend="Registered"
            color="#9c27b0"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 
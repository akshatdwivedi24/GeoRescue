import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const IncidentStatus = {
  REPORTED: 'REPORTED',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
};

const IncidentSeverity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
};

const Incidents = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: IncidentStatus.REPORTED,
    severity: IncidentSeverity.MEDIUM,
    reportedBy: user?.email || '',
    assignedTo: '',
    notes: '',
  });

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/incidents', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  const handleOpen = (incident = null) => {
    if (incident) {
      setEditingIncident(incident);
      setFormData(incident);
    } else {
      setEditingIncident(null);
      setFormData({
        title: '',
        description: '',
        location: '',
        status: IncidentStatus.REPORTED,
        severity: IncidentSeverity.MEDIUM,
        reportedBy: user?.email || '',
        assignedTo: '',
        notes: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIncident(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      status: IncidentStatus.REPORTED,
      severity: IncidentSeverity.MEDIUM,
      reportedBy: user?.email || '',
      assignedTo: '',
      notes: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingIncident
        ? `http://localhost:8081/api/incidents/${editingIncident.id}`
        : 'http://localhost:8081/api/incidents';
      
      const method = editingIncident ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchIncidents();
        handleClose();
      }
    } catch (error) {
      console.error('Error saving incident:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/incidents/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          fetchIncidents();
        }
      } catch (error) {
        console.error('Error deleting incident:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case IncidentStatus.REPORTED:
        return 'info';
      case IncidentStatus.IN_PROGRESS:
        return 'warning';
      case IncidentStatus.RESOLVED:
        return 'success';
      case IncidentStatus.CLOSED:
        return 'default';
      default:
        return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case IncidentSeverity.LOW:
        return 'success';
      case IncidentSeverity.MEDIUM:
        return 'warning';
      case IncidentSeverity.HIGH:
        return 'error';
      case IncidentSeverity.CRITICAL:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Incidents
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Report Incident
        </Button>
      </Box>

      <Grid container spacing={3}>
        {incidents.map((incident) => (
          <Grid item xs={12} sm={6} md={4} key={incident.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{incident.title}</Typography>
                  <Box>
                    <IconButton onClick={() => handleOpen(incident)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(incident.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" paragraph>
                  {incident.description}
                </Typography>
                <Typography color="textSecondary">
                  Location: {incident.location}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Chip
                    label={incident.status}
                    color={getStatusColor(incident.status)}
                    size="small"
                  />
                  <Chip
                    label={incident.severity}
                    color={getSeverityColor(incident.severity)}
                    size="small"
                  />
                </Box>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Reported by: {incident.reportedBy}
                </Typography>
                {incident.assignedTo && (
                  <Typography color="textSecondary">
                    Assigned to: {incident.assignedTo}
                  </Typography>
                )}
                {incident.notes && (
                  <Typography color="textSecondary" sx={{ mt: 1 }}>
                    Notes: {incident.notes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingIncident ? 'Edit Incident' : 'Report New Incident'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              required
            />
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                label="Status"
              >
                {Object.values(IncidentStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Severity</InputLabel>
              <Select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                label="Severity"
              >
                {Object.values(IncidentSeverity).map((severity) => (
                  <MenuItem key={severity} value={severity}>
                    {severity}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Assigned To"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingIncident ? 'Update' : 'Report'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Incidents; 
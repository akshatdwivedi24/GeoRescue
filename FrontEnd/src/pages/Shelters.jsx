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
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const ShelterStatus = {
  OPEN: 'OPEN',
  FULL: 'FULL',
  CLOSED: 'CLOSED',
  MAINTENANCE: 'MAINTENANCE',
};

const Shelters = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [shelters, setShelters] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingShelter, setEditingShelter] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: ShelterStatus.OPEN,
    capacity: 0,
    currentOccupancy: 0,
    resources: [],
    facilities: [],
    contactPerson: '',
    contactPhone: '',
    notes: '',
  });

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/shelters', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setShelters(data);
      }
    } catch (error) {
      console.error('Error fetching shelters:', error);
    }
  };

  const handleOpen = (shelter = null) => {
    if (shelter) {
      setEditingShelter(shelter);
      setFormData(shelter);
    } else {
      setEditingShelter(null);
      setFormData({
        name: '',
        location: '',
        status: ShelterStatus.OPEN,
        capacity: 0,
        currentOccupancy: 0,
        resources: [],
        facilities: [],
        contactPerson: '',
        contactPhone: '',
        notes: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingShelter(null);
    setFormData({
      name: '',
      location: '',
      status: ShelterStatus.OPEN,
      capacity: 0,
      currentOccupancy: 0,
      resources: [],
      facilities: [],
      contactPerson: '',
      contactPhone: '',
      notes: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingShelter
        ? `http://localhost:8081/api/shelters/${editingShelter.id}`
        : 'http://localhost:8081/api/shelters';
      
      const method = editingShelter ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchShelters();
        handleClose();
      }
    } catch (error) {
      console.error('Error saving shelter:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shelter?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/shelters/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          fetchShelters();
        }
      } catch (error) {
        console.error('Error deleting shelter:', error);
      }
    }
  };

  const handleAddResource = () => {
    const newResource = prompt('Enter resource name:');
    if (newResource) {
      setFormData({
        ...formData,
        resources: [...formData.resources, newResource],
      });
    }
  };

  const handleRemoveResource = (index) => {
    setFormData({
      ...formData,
      resources: formData.resources.filter((_, i) => i !== index),
    });
  };

  const handleAddFacility = () => {
    const newFacility = prompt('Enter facility name:');
    if (newFacility) {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, newFacility],
      });
    }
  };

  const handleRemoveFacility = (index) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.filter((_, i) => i !== index),
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ShelterStatus.OPEN:
        return 'success';
      case ShelterStatus.FULL:
        return 'warning';
      case ShelterStatus.CLOSED:
        return 'error';
      case ShelterStatus.MAINTENANCE:
        return 'info';
      default:
        return 'default';
    }
  };

  const getOccupancyPercentage = (current, capacity) => {
    return (current / capacity) * 100;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Shelters
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Shelter
        </Button>
      </Box>

      <Grid container spacing={3}>
        {shelters.map((shelter) => (
          <Grid item xs={12} sm={6} md={4} key={shelter.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{shelter.name}</Typography>
                  <Box>
                    <IconButton onClick={() => handleOpen(shelter)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(shelter.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary">
                  Location: {shelter.location}
                </Typography>
                <Chip
                  label={shelter.status}
                  color={getStatusColor(shelter.status)}
                  size="small"
                  sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Occupancy: {shelter.currentOccupancy} / {shelter.capacity}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={getOccupancyPercentage(shelter.currentOccupancy, shelter.capacity)}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Contact Person: {shelter.contactPerson}
                </Typography>
                <Typography color="textSecondary">
                  Phone: {shelter.contactPhone}
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Resources:
                </Typography>
                <List dense>
                  {shelter.resources.map((resource, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={resource} />
                    </ListItem>
                  ))}
                </List>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Facilities:
                </Typography>
                <List dense>
                  {shelter.facilities.map((facility, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={facility} />
                    </ListItem>
                  ))}
                </List>
                {shelter.notes && (
                  <Typography color="textSecondary" sx={{ mt: 1 }}>
                    Notes: {shelter.notes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingShelter ? 'Edit Shelter' : 'Add New Shelter'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
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
                {Object.values(ShelterStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
              margin="normal"
              required
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              fullWidth
              label="Current Occupancy"
              type="number"
              value={formData.currentOccupancy}
              onChange={(e) => setFormData({ ...formData, currentOccupancy: parseInt(e.target.value) })}
              margin="normal"
              required
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              fullWidth
              label="Contact Person"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contact Phone"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              margin="normal"
              required
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Resources</Typography>
              <List dense>
                {formData.resources.map((resource, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={resource} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleRemoveResource(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddResource}
                sx={{ mt: 1 }}
              >
                Add Resource
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Facilities</Typography>
              <List dense>
                {formData.facilities.map((facility, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={facility} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleRemoveFacility(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddFacility}
                sx={{ mt: 1 }}
              >
                Add Facility
              </Button>
            </Box>
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
              {editingShelter ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Shelters; 
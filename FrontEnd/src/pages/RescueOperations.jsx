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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const OperationStatus = {
  PLANNED: 'PLANNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

const RescueOperations = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [operations, setOperations] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: OperationStatus.PLANNED,
    startTime: '',
    endTime: '',
    teamMembers: [],
    resources: '',
    incidentId: '',
    notes: '',
  });

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/rescue-operations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOperations(data);
      }
    } catch (error) {
      console.error('Error fetching operations:', error);
    }
  };

  const handleOpen = (operation = null) => {
    if (operation) {
      setEditingOperation(operation);
      setFormData(operation);
    } else {
      setEditingOperation(null);
      setFormData({
        title: '',
        description: '',
        location: '',
        status: OperationStatus.PLANNED,
        startTime: '',
        endTime: '',
        teamMembers: [],
        resources: '',
        incidentId: '',
        notes: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingOperation(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      status: OperationStatus.PLANNED,
      startTime: '',
      endTime: '',
      teamMembers: [],
      resources: '',
      incidentId: '',
      notes: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingOperation
        ? `http://localhost:8081/api/rescue-operations/${editingOperation.id}`
        : 'http://localhost:8081/api/rescue-operations';
      
      const method = editingOperation ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchOperations();
        handleClose();
      }
    } catch (error) {
      console.error('Error saving operation:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this operation?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/rescue-operations/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          fetchOperations();
        }
      } catch (error) {
        console.error('Error deleting operation:', error);
      }
    }
  };

  const handleAddTeamMember = () => {
    const newMember = prompt('Enter team member email:');
    if (newMember) {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, newMember],
      });
    }
  };

  const handleRemoveTeamMember = (index) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== index),
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case OperationStatus.PLANNED:
        return 'info';
      case OperationStatus.IN_PROGRESS:
        return 'warning';
      case OperationStatus.COMPLETED:
        return 'success';
      case OperationStatus.CANCELLED:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Rescue Operations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          New Operation
        </Button>
      </Box>

      <Grid container spacing={3}>
        {operations.map((operation) => (
          <Grid item xs={12} sm={6} md={4} key={operation.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{operation.title}</Typography>
                  <Box>
                    <IconButton onClick={() => handleOpen(operation)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(operation.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" paragraph>
                  {operation.description}
                </Typography>
                <Typography color="textSecondary">
                  Location: {operation.location}
                </Typography>
                <Chip
                  label={operation.status}
                  color={getStatusColor(operation.status)}
                  size="small"
                  sx={{ mt: 2 }}
                />
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Start Time: {new Date(operation.startTime).toLocaleString()}
                </Typography>
                {operation.endTime && (
                  <Typography color="textSecondary">
                    End Time: {new Date(operation.endTime).toLocaleString()}
                  </Typography>
                )}
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Team Members:
                </Typography>
                <List dense>
                  {operation.teamMembers.map((member, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={member} />
                    </ListItem>
                  ))}
                </List>
                {operation.resources && (
                  <Typography color="textSecondary" sx={{ mt: 1 }}>
                    Resources: {operation.resources}
                  </Typography>
                )}
                {operation.notes && (
                  <Typography color="textSecondary" sx={{ mt: 1 }}>
                    Notes: {operation.notes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingOperation ? 'Edit Operation' : 'New Rescue Operation'}
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
                {Object.values(OperationStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Start Time"
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="End Time"
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Team Members</Typography>
              <List dense>
                {formData.teamMembers.map((member, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={member} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleRemoveTeamMember(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddTeamMember}
                sx={{ mt: 1 }}
              >
                Add Team Member
              </Button>
            </Box>
            <TextField
              fullWidth
              label="Resources"
              value={formData.resources}
              onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
              margin="normal"
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label="Incident ID"
              value={formData.incidentId}
              onChange={(e) => setFormData({ ...formData, incidentId: e.target.value })}
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
              {editingOperation ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default RescueOperations; 
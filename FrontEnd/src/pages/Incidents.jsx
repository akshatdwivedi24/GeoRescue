import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Chip,
  Paper,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  PriorityHigh as PriorityIcon,
  LocalHospital as HospitalIcon,
  LocalPolice as PoliceIcon,
  LocalFireDepartment as FireIcon,
  DirectionsCar as AmbulanceIcon,
  Pets as PetIcon,
  ChildCare as ChildIcon,
  ElderlyWoman as ElderlyIcon,
  AccessibilityNew as DisabilityIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

const Incidents = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [incidents, setIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    severity: 'MEDIUM',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    status: 'OPEN',
    category: '',
    priority: 'MEDIUM',
    reporterName: '',
    reporterPhone: '',
    reporterEmail: '',
    affectedPeople: 0,
    injuries: 0,
    fatalities: 0,
    mediaUrls: [],
    assignedTo: '',
    estimatedResolutionTime: '',
    notes: '',
  });

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration
      setIncidents([
        {
          id: 1,
          title: 'Flood in Downtown Area',
          type: 'NATURAL_DISASTER',
          severity: 'HIGH',
          description: 'Heavy rainfall causing flooding in downtown area',
          location: '123 Main St, Downtown',
          latitude: '40.7128',
          longitude: '-74.0060',
          status: 'OPEN',
          category: 'FLOOD',
          priority: 'HIGH',
          reporterName: 'John Doe',
          reporterPhone: '123-456-7890',
          reporterEmail: 'john@example.com',
          affectedPeople: 50,
          injuries: 2,
          fatalities: 0,
          mediaUrls: ['https://example.com/flood1.jpg'],
          assignedTo: 'Emergency Response Team A',
          estimatedResolutionTime: '24 hours',
          notes: 'Water level rising rapidly',
          createdAt: '2024-03-29T10:00:00Z',
          updatedAt: '2024-03-29T10:30:00Z',
        },
        {
          id: 2,
          title: 'Building Fire',
          type: 'FIRE',
          severity: 'CRITICAL',
          description: 'Multi-story building on fire',
          location: '456 Oak Ave, Midtown',
          latitude: '40.7128',
          longitude: '-74.0060',
          status: 'IN_PROGRESS',
          category: 'FIRE',
          priority: 'HIGH',
          reporterName: 'Jane Smith',
          reporterPhone: '098-765-4321',
          reporterEmail: 'jane@example.com',
          affectedPeople: 20,
          injuries: 5,
          fatalities: 0,
          mediaUrls: ['https://example.com/fire1.jpg'],
          assignedTo: 'Fire Department Unit B',
          estimatedResolutionTime: '2 hours',
          notes: 'Fire spreading to adjacent buildings',
          createdAt: '2024-03-29T09:00:00Z',
          updatedAt: '2024-03-29T09:45:00Z',
        },
      ]);
    } catch (error) {
      setSnackbarMessage('Error fetching incidents. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddIncident = () => {
    setSelectedIncident(null);
    setFormData({
      title: '',
      type: '',
      severity: 'MEDIUM',
      description: '',
      location: '',
      latitude: '',
      longitude: '',
      status: 'OPEN',
      category: '',
      priority: 'MEDIUM',
      reporterName: '',
      reporterPhone: '',
      reporterEmail: '',
      affectedPeople: 0,
      injuries: 0,
      fatalities: 0,
      mediaUrls: [],
      assignedTo: '',
      estimatedResolutionTime: '',
      notes: '',
    });
    setOpenDialog(true);
  };

  const handleEditIncident = (incident) => {
    setSelectedIncident(incident);
    setFormData(incident);
    setOpenDialog(true);
  };

  const handleDeleteIncident = async (incidentId) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        // TODO: Implement API call to delete incident
        setSnackbarMessage('Incident deleted successfully!');
        setOpenSnackbar(true);
        fetchIncidents();
      } catch (error) {
        setSnackbarMessage('Error deleting incident. Please try again.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // TODO: Implement API call to save incident
      setSnackbarMessage(selectedIncident ? 'Incident updated successfully!' : 'Incident added successfully!');
      setOpenSnackbar(true);
      setOpenDialog(false);
      fetchIncidents();
    } catch (error) {
      setSnackbarMessage('Error saving incident. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'NATURAL_DISASTER':
        return <WarningIcon color="error" />;
      case 'FIRE':
        return <FireIcon color="error" />;
      case 'MEDICAL':
        return <HospitalIcon color="error" />;
      case 'POLICE':
        return <PoliceIcon color="primary" />;
      case 'AMBULANCE':
        return <AmbulanceIcon color="error" />;
      case 'ANIMAL':
        return <PetIcon color="success" />;
      case 'CHILD':
        return <ChildIcon color="primary" />;
      case 'ELDERLY':
        return <ElderlyIcon color="primary" />;
      case 'DISABILITY':
        return <DisabilityIcon color="primary" />;
      default:
        return <WarningIcon color="warning" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'error';
      case 'IN_PROGRESS':
        return 'warning';
      case 'RESOLVED':
        return 'success';
      case 'CLOSED':
        return 'info';
      default:
        return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'error';
      case 'HIGH':
        return 'warning';
      case 'MEDIUM':
        return 'info';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredIncidents = incidents.filter(incident =>
    incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Incident Management
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search incidents..."
                    value={searchQuery}
                    onChange={handleSearch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={handleAddIncident}
                  >
                    Report New Incident
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {loading ? (
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          ) : (
            filteredIncidents.map((incident) => (
              <Grid item xs={12} sm={6} md={4} key={incident.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getIncidentIcon(incident.type)}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {incident.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {incident.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        label={incident.status}
                        color={getStatusColor(incident.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={incident.severity}
                        color={getSeverityColor(incident.severity)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={incident.category}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{incident.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Affected: {incident.affectedPeople} | Injuries: {incident.injuries} | Fatalities: {incident.fatalities}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        ETA: {incident.estimatedResolutionTime}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Reported by: {incident.reporterName}
                      </Typography>
                      <Box>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditIncident(incident)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteIncident(incident.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedIncident ? 'Edit Incident' : 'Report New Incident'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    label="Type"
                  >
                    <MenuItem value="NATURAL_DISASTER">Natural Disaster</MenuItem>
                    <MenuItem value="FIRE">Fire</MenuItem>
                    <MenuItem value="MEDICAL">Medical Emergency</MenuItem>
                    <MenuItem value="POLICE">Police Incident</MenuItem>
                    <MenuItem value="AMBULANCE">Ambulance Required</MenuItem>
                    <MenuItem value="ANIMAL">Animal Emergency</MenuItem>
                    <MenuItem value="CHILD">Child Emergency</MenuItem>
                    <MenuItem value="ELDERLY">Elderly Emergency</MenuItem>
                    <MenuItem value="DISABILITY">Disability Support</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Severity</InputLabel>
                  <Select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    label="Severity"
                  >
                    <MenuItem value="CRITICAL">Critical</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="LOW">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Latitude"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Longitude"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    label="Status"
                  >
                    <MenuItem value="OPEN">Open</MenuItem>
                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                    <MenuItem value="RESOLVED">Resolved</MenuItem>
                    <MenuItem value="CLOSED">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    label="Category"
                  >
                    <MenuItem value="FLOOD">Flood</MenuItem>
                    <MenuItem value="EARTHQUAKE">Earthquake</MenuItem>
                    <MenuItem value="HURRICANE">Hurricane</MenuItem>
                    <MenuItem value="TORNADO">Tornado</MenuItem>
                    <MenuItem value="FIRE">Fire</MenuItem>
                    <MenuItem value="MEDICAL">Medical</MenuItem>
                    <MenuItem value="CRIME">Crime</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    label="Priority"
                  >
                    <MenuItem value="HIGH">High</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="LOW">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reporter Name"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reporter Phone"
                  value={formData.reporterPhone}
                  onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reporter Email"
                  type="email"
                  value={formData.reporterEmail}
                  onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Affected People"
                  type="number"
                  value={formData.affectedPeople}
                  onChange={(e) => setFormData({ ...formData, affectedPeople: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Injuries"
                  type="number"
                  value={formData.injuries}
                  onChange={(e) => setFormData({ ...formData, injuries: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fatalities"
                  type="number"
                  value={formData.fatalities}
                  onChange={(e) => setFormData({ ...formData, fatalities: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Assigned To"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estimated Resolution Time"
                  value={formData.estimatedResolutionTime}
                  onChange={(e) => setFormData({ ...formData, estimatedResolutionTime: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedIncident ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Incidents; 
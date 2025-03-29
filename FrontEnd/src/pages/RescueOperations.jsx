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
  Stepper,
  Step,
  StepLabel,
  StepContent,
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
  Group as TeamIcon,
  Assignment as TaskIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Directions as DirectionsIcon,
  Call as CallIcon,
  Home as HomeIcon,
  LocalParking as ParkingIcon,
  Restaurant as FoodIcon,
  LocalPharmacy as MedicalIcon,
  Wifi as WifiIcon,
  Power as PowerIcon,
  WaterDrop as WaterIcon,
  Security as SecurityIcon,
  Business as BuildingIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

const RescueOperations = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [operations, setOperations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    status: 'PLANNING',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    priority: 'MEDIUM',
    incidentId: '',
    teamLeader: '',
    teamMembers: [],
    equipment: [],
    startTime: '',
    estimatedEndTime: '',
    actualEndTime: '',
    casualties: {
      rescued: 0,
      injured: 0,
      fatalities: 0,
    },
    resources: {
      personnel: 0,
      vehicles: 0,
      equipment: [],
    },
    tasks: [],
    progress: 0,
    notes: '',
  });

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration
      setOperations([
        {
          id: 1,
          title: 'Flood Rescue Operation',
          type: 'FLOOD',
          status: 'IN_PROGRESS',
          description: 'Rescue operation for flood-affected areas',
          location: '123 Main St, Downtown',
          latitude: '40.7128',
          longitude: '-74.0060',
          priority: 'HIGH',
          incidentId: 'INC-001',
          teamLeader: 'John Smith',
          teamMembers: ['Alice Johnson', 'Bob Wilson', 'Carol Davis'],
          equipment: ['Rescue Boats', 'Life Jackets', 'First Aid Kits'],
          startTime: '2024-03-29T10:00:00Z',
          estimatedEndTime: '2024-03-30T10:00:00Z',
          actualEndTime: null,
          casualties: {
            rescued: 15,
            injured: 3,
            fatalities: 0,
          },
          resources: {
            personnel: 10,
            vehicles: 3,
            equipment: ['Rescue Boats', 'Life Jackets', 'First Aid Kits'],
          },
          tasks: [
            { id: 1, title: 'Initial Assessment', status: 'COMPLETED' },
            { id: 2, title: 'Deploy Rescue Teams', status: 'IN_PROGRESS' },
            { id: 3, title: 'Evacuate Residents', status: 'PENDING' },
          ],
          progress: 45,
          notes: 'Water level still rising',
          createdAt: '2024-03-29T10:00:00Z',
          updatedAt: '2024-03-29T10:30:00Z',
        },
        {
          id: 2,
          title: 'Building Collapse Rescue',
          type: 'STRUCTURAL',
          status: 'PLANNING',
          description: 'Rescue operation for collapsed building',
          location: '456 Oak Ave, Midtown',
          latitude: '40.7128',
          longitude: '-74.0060',
          priority: 'CRITICAL',
          incidentId: 'INC-002',
          teamLeader: 'Jane Doe',
          teamMembers: ['Mike Brown', 'Sarah Wilson', 'Tom Davis'],
          equipment: ['Heavy Machinery', 'Search Dogs', 'Medical Supplies'],
          startTime: '2024-03-29T11:00:00Z',
          estimatedEndTime: '2024-03-30T11:00:00Z',
          actualEndTime: null,
          casualties: {
            rescued: 0,
            injured: 0,
            fatalities: 0,
          },
          resources: {
            personnel: 15,
            vehicles: 5,
            equipment: ['Heavy Machinery', 'Search Dogs', 'Medical Supplies'],
          },
          tasks: [
            { id: 1, title: 'Site Assessment', status: 'PENDING' },
            { id: 2, title: 'Deploy Heavy Equipment', status: 'PENDING' },
            { id: 3, title: 'Begin Search and Rescue', status: 'PENDING' },
          ],
          progress: 0,
          notes: 'Awaiting structural assessment',
          createdAt: '2024-03-29T11:00:00Z',
          updatedAt: '2024-03-29T11:15:00Z',
        },
      ]);
    } catch (error) {
      setSnackbarMessage('Error fetching operations. Please try again.');
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

  const handleAddOperation = () => {
    setSelectedOperation(null);
    setFormData({
      title: '',
      type: '',
      status: 'PLANNING',
      description: '',
      location: '',
      latitude: '',
      longitude: '',
      priority: 'MEDIUM',
      incidentId: '',
      teamLeader: '',
      teamMembers: [],
      equipment: [],
      startTime: '',
      estimatedEndTime: '',
      actualEndTime: '',
      casualties: {
        rescued: 0,
        injured: 0,
        fatalities: 0,
      },
      resources: {
        personnel: 0,
        vehicles: 0,
        equipment: [],
      },
      tasks: [],
      progress: 0,
      notes: '',
    });
    setActiveStep(0);
    setOpenDialog(true);
  };

  const handleEditOperation = (operation) => {
    setSelectedOperation(operation);
    setFormData(operation);
    setActiveStep(0);
    setOpenDialog(true);
  };

  const handleDeleteOperation = async (operationId) => {
    if (window.confirm('Are you sure you want to delete this operation?')) {
      try {
        // TODO: Implement API call to delete operation
        setSnackbarMessage('Operation deleted successfully!');
        setOpenSnackbar(true);
        fetchOperations();
      } catch (error) {
        setSnackbarMessage('Error deleting operation. Please try again.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // TODO: Implement API call to save operation
      setSnackbarMessage(selectedOperation ? 'Operation updated successfully!' : 'Operation added successfully!');
      setOpenSnackbar(true);
      setOpenDialog(false);
      fetchOperations();
    } catch (error) {
      setSnackbarMessage('Error saving operation. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getOperationIcon = (type) => {
    switch (type) {
      case 'FLOOD':
        return <WarningIcon color="error" />;
      case 'FIRE':
        return <FireIcon color="error" />;
      case 'STRUCTURAL':
        return <BuildingIcon color="error" />;
      case 'MEDICAL':
        return <HospitalIcon color="error" />;
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
      case 'PLANNING':
        return 'info';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const filteredOperations = operations.filter(operation =>
    operation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    operation.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    operation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    operation.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Rescue Operations
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search operations..."
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
                    onClick={handleAddOperation}
                  >
                    New Operation
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
            filteredOperations.map((operation) => (
              <Grid item xs={12} sm={6} md={4} key={operation.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getOperationIcon(operation.type)}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {operation.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {operation.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        label={operation.status}
                        color={getStatusColor(operation.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={operation.priority}
                        color={getPriorityColor(operation.priority)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={operation.type}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{operation.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TeamIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Team: {operation.teamMembers.length} members
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TimelineIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Progress: {operation.progress}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Leader: {operation.teamLeader}
                      </Typography>
                      <Box>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditOperation(operation)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteOperation(operation.id)}
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
          {selectedOperation ? 'Edit Operation' : 'New Operation'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>Basic Information</StepLabel>
                <StepContent>
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
                          <MenuItem value="FLOOD">Flood</MenuItem>
                          <MenuItem value="FIRE">Fire</MenuItem>
                          <MenuItem value="STRUCTURAL">Structural</MenuItem>
                          <MenuItem value="MEDICAL">Medical</MenuItem>
                          <MenuItem value="ANIMAL">Animal</MenuItem>
                          <MenuItem value="CHILD">Child</MenuItem>
                          <MenuItem value="ELDERLY">Elderly</MenuItem>
                          <MenuItem value="DISABILITY">Disability</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          label="Status"
                        >
                          <MenuItem value="PLANNING">Planning</MenuItem>
                          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                          <MenuItem value="COMPLETED">Completed</MenuItem>
                          <MenuItem value="CANCELLED">Cancelled</MenuItem>
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
                        <InputLabel>Priority</InputLabel>
                        <Select
                          value={formData.priority}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          label="Priority"
                        >
                          <MenuItem value="CRITICAL">Critical</MenuItem>
                          <MenuItem value="HIGH">High</MenuItem>
                          <MenuItem value="MEDIUM">Medium</MenuItem>
                          <MenuItem value="LOW">Low</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Incident ID"
                        value={formData.incidentId}
                        onChange={(e) => setFormData({ ...formData, incidentId: e.target.value })}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                    >
                      Next
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Team & Resources</StepLabel>
                <StepContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Team Leader"
                        value={formData.teamLeader}
                        onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Team Members (comma-separated)"
                        value={formData.teamMembers.join(', ')}
                        onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value.split(',').map(s => s.trim()) })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Equipment (comma-separated)"
                        value={formData.equipment.join(', ')}
                        onChange={(e) => setFormData({ ...formData, equipment: e.target.value.split(',').map(s => s.trim()) })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Start Time"
                        type="datetime-local"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Estimated End Time"
                        type="datetime-local"
                        value={formData.estimatedEndTime}
                        onChange={(e) => setFormData({ ...formData, estimatedEndTime: e.target.value })}
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Actual End Time"
                        type="datetime-local"
                        value={formData.actualEndTime}
                        onChange={(e) => setFormData({ ...formData, actualEndTime: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Personnel Count"
                        type="number"
                        value={formData.resources.personnel}
                        onChange={(e) => setFormData({ ...formData, resources: { ...formData.resources, personnel: parseInt(e.target.value) } })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Vehicle Count"
                        type="number"
                        value={formData.resources.vehicles}
                        onChange={(e) => setFormData({ ...formData, resources: { ...formData.resources, vehicles: parseInt(e.target.value) } })}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                    >
                      Next
                    </Button>
                    <Button onClick={handleBack}>
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Casualties & Tasks</StepLabel>
                <StepContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Rescued"
                        type="number"
                        value={formData.casualties.rescued}
                        onChange={(e) => setFormData({ ...formData, casualties: { ...formData.casualties, rescued: parseInt(e.target.value) } })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Injured"
                        type="number"
                        value={formData.casualties.injured}
                        onChange={(e) => setFormData({ ...formData, casualties: { ...formData.casualties, injured: parseInt(e.target.value) } })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Fatalities"
                        type="number"
                        value={formData.casualties.fatalities}
                        onChange={(e) => setFormData({ ...formData, casualties: { ...formData.casualties, fatalities: parseInt(e.target.value) } })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Tasks (one per line)"
                        value={formData.tasks.map(task => task.title).join('\n')}
                        onChange={(e) => setFormData({
                          ...formData,
                          tasks: e.target.value.split('\n').map((title, index) => ({
                            id: index + 1,
                            title: title.trim(),
                            status: 'PENDING'
                          }))
                        })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Progress (%)"
                        type="number"
                        value={formData.progress}
                        onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                        required
                        InputProps={{
                          inputProps: { min: 0, max: 100 }
                        }}
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
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mr: 1 }}
                    >
                      {selectedOperation ? 'Update' : 'Create'}
                    </Button>
                    <Button onClick={handleBack}>
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </DialogContent>
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

export default RescueOperations; 
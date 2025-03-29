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
  Rating,
  CardMedia,
  CardActions,
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
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

const Shelters = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [shelters, setShelters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'OPEN',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    capacity: 0,
    currentOccupancy: 0,
    facilities: [],
    amenities: [],
    contactPerson: {
      name: '',
      phone: '',
      email: '',
    },
    operatingHours: {
      open: '',
      close: '',
    },
    rating: 0,
    reviews: [],
    images: [],
    notes: '',
  });

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration
      setShelters([
        {
          id: 1,
          name: 'Community Emergency Shelter',
          type: 'GENERAL',
          status: 'OPEN',
          description: 'Large community center converted into emergency shelter',
          address: '123 Main St, Downtown',
          latitude: '40.7128',
          longitude: '-74.0060',
          capacity: 200,
          currentOccupancy: 150,
          facilities: ['Beds', 'Showers', 'Kitchen', 'Medical Station'],
          amenities: ['WiFi', 'Parking', 'Food Service', 'Medical Support'],
          contactPerson: {
            name: 'John Smith',
            phone: '123-456-7890',
            email: 'john@example.com',
          },
          operatingHours: {
            open: '24/7',
            close: '24/7',
          },
          rating: 4.5,
          reviews: [
            { id: 1, rating: 5, comment: 'Excellent facilities and staff' },
            { id: 2, rating: 4, comment: 'Good location and amenities' },
          ],
          images: ['https://example.com/shelter1.jpg'],
          notes: 'Pet-friendly shelter with medical support',
          createdAt: '2024-03-29T10:00:00Z',
          updatedAt: '2024-03-29T10:30:00Z',
        },
        {
          id: 2,
          name: 'Special Needs Shelter',
          type: 'SPECIAL_NEEDS',
          status: 'OPEN',
          description: 'Shelter equipped for people with special needs',
          address: '456 Oak Ave, Midtown',
          latitude: '40.7128',
          longitude: '-74.0060',
          capacity: 50,
          currentOccupancy: 30,
          facilities: ['Wheelchair Access', 'Medical Beds', 'Specialized Care'],
          amenities: ['Medical Support', 'Accessibility', 'Specialized Staff'],
          contactPerson: {
            name: 'Jane Doe',
            phone: '098-765-4321',
            email: 'jane@example.com',
          },
          operatingHours: {
            open: '24/7',
            close: '24/7',
          },
          rating: 4.8,
          reviews: [
            { id: 1, rating: 5, comment: 'Excellent specialized care' },
            { id: 2, rating: 4, comment: 'Very accessible facility' },
          ],
          images: ['https://example.com/shelter2.jpg'],
          notes: 'Specialized medical staff available 24/7',
          createdAt: '2024-03-29T11:00:00Z',
          updatedAt: '2024-03-29T11:15:00Z',
        },
      ]);
    } catch (error) {
      setSnackbarMessage('Error fetching shelters. Please try again.');
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

  const handleAddShelter = () => {
    setSelectedShelter(null);
    setFormData({
      name: '',
      type: '',
      status: 'OPEN',
      description: '',
      address: '',
      latitude: '',
      longitude: '',
      capacity: 0,
      currentOccupancy: 0,
      facilities: [],
      amenities: [],
      contactPerson: {
        name: '',
        phone: '',
        email: '',
      },
      operatingHours: {
        open: '',
        close: '',
      },
      rating: 0,
      reviews: [],
      images: [],
      notes: '',
    });
    setOpenDialog(true);
  };

  const handleEditShelter = (shelter) => {
    setSelectedShelter(shelter);
    setFormData(shelter);
    setOpenDialog(true);
  };

  const handleDeleteShelter = async (shelterId) => {
    if (window.confirm('Are you sure you want to delete this shelter?')) {
      try {
        // TODO: Implement API call to delete shelter
        setSnackbarMessage('Shelter deleted successfully!');
        setOpenSnackbar(true);
        fetchShelters();
      } catch (error) {
        setSnackbarMessage('Error deleting shelter. Please try again.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // TODO: Implement API call to save shelter
      setSnackbarMessage(selectedShelter ? 'Shelter updated successfully!' : 'Shelter added successfully!');
      setOpenSnackbar(true);
      setOpenDialog(false);
      fetchShelters();
    } catch (error) {
      setSnackbarMessage('Error saving shelter. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const getShelterIcon = (type) => {
    switch (type) {
      case 'GENERAL':
        return <HomeIcon color="primary" />;
      case 'SPECIAL_NEEDS':
        return <DisabilityIcon color="primary" />;
      case 'MEDICAL':
        return <HospitalIcon color="error" />;
      case 'ANIMAL':
        return <PetIcon color="success" />;
      case 'CHILD':
        return <ChildIcon color="primary" />;
      case 'ELDERLY':
        return <ElderlyIcon color="primary" />;
      default:
        return <HomeIcon color="primary" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'success';
      case 'FULL':
        return 'warning';
      case 'CLOSED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'WiFi':
        return <WifiIcon />;
      case 'Parking':
        return <ParkingIcon />;
      case 'Food Service':
        return <FoodIcon />;
      case 'Medical Support':
        return <MedicalIcon />;
      case 'Power':
        return <PowerIcon />;
      case 'Water':
        return <WaterIcon />;
      case 'Security':
        return <SecurityIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const filteredShelters = shelters.filter(shelter =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shelter.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shelter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shelter.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Emergency Shelters
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search shelters..."
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
                    onClick={handleAddShelter}
                  >
                    Add New Shelter
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
            filteredShelters.map((shelter) => (
              <Grid item xs={12} sm={6} md={4} key={shelter.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={shelter.images[0] || 'https://via.placeholder.com/300x140'}
                    alt={shelter.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getShelterIcon(shelter.type)}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {shelter.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {shelter.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        label={shelter.status}
                        color={getStatusColor(shelter.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={shelter.type.replace('_', ' ')}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{shelter.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Occupancy: {shelter.currentOccupancy}/{shelter.capacity}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={shelter.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({shelter.reviews.length} reviews)
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {shelter.amenities.map((amenity) => (
                        <Tooltip key={amenity} title={amenity}>
                          <Chip
                            icon={getAmenityIcon(amenity)}
                            label={amenity}
                            size="small"
                            variant="outlined"
                          />
                        </Tooltip>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<DirectionsIcon />}
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${shelter.latitude},${shelter.longitude}`, '_blank')}
                    >
                      Get Directions
                    </Button>
                    <Button
                      size="small"
                      startIcon={<CallIcon />}
                      onClick={() => window.open(`tel:${shelter.contactPerson.phone}`)}
                    >
                      Call
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEditShelter(shelter)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteShelter(shelter.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
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
          {selectedShelter ? 'Edit Shelter' : 'Add New Shelter'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <MenuItem value="GENERAL">General</MenuItem>
                    <MenuItem value="SPECIAL_NEEDS">Special Needs</MenuItem>
                    <MenuItem value="MEDICAL">Medical</MenuItem>
                    <MenuItem value="ANIMAL">Animal</MenuItem>
                    <MenuItem value="CHILD">Child</MenuItem>
                    <MenuItem value="ELDERLY">Elderly</MenuItem>
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
                    <MenuItem value="OPEN">Open</MenuItem>
                    <MenuItem value="FULL">Full</MenuItem>
                    <MenuItem value="CLOSED">Closed</MenuItem>
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
                  label="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                <TextField
                  fullWidth
                  label="Capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current Occupancy"
                  type="number"
                  value={formData.currentOccupancy}
                  onChange={(e) => setFormData({ ...formData, currentOccupancy: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Facilities (comma-separated)"
                  value={formData.facilities.join(', ')}
                  onChange={(e) => setFormData({ ...formData, facilities: e.target.value.split(',').map(s => s.trim()) })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amenities (comma-separated)"
                  value={formData.amenities.join(', ')}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value.split(',').map(s => s.trim()) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Person Name"
                  value={formData.contactPerson.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactPerson: { ...formData.contactPerson, name: e.target.value }
                  })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Person Phone"
                  value={formData.contactPerson.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactPerson: { ...formData.contactPerson, phone: e.target.value }
                  })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Person Email"
                  type="email"
                  value={formData.contactPerson.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactPerson: { ...formData.contactPerson, email: e.target.value }
                  })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Operating Hours"
                  value={`${formData.operatingHours.open} - ${formData.operatingHours.close}`}
                  onChange={(e) => {
                    const [open, close] = e.target.value.split(' - ');
                    setFormData({
                      ...formData,
                      operatingHours: { open, close }
                    });
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Images (comma-separated URLs)"
                  value={formData.images.join(', ')}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map(s => s.trim()) })}
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
              {selectedShelter ? 'Update' : 'Add'}
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

export default Shelters; 
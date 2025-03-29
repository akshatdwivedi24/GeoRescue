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
  Rating,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Directions as DirectionsIcon,
  Pets as PetsIcon,
  LocalHospital as MedicalIcon,
  Restaurant as FoodIcon,
  Bed as BedIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ShelterFinder = () => {
  const theme = useTheme();
  const [location, setLocation] = useState(null);
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchRadius, setSearchRadius] = useState(5);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          // TODO: Fetch nearby shelters based on location
          fetchNearbyShelters(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setSnackbarMessage('Error getting location. Please enable location services.');
          setOpenSnackbar(true);
        }
      );
    }
  }, []);

  const fetchNearbyShelters = async (lat, lng) => {
    try {
      // TODO: Implement API call to fetch shelters
      // Mock data for demonstration
      setShelters([
        {
          id: 1,
          name: 'Community Center Shelter',
          address: '123 Main St, City',
          distance: '0.5 km',
          capacity: 100,
          currentOccupancy: 75,
          rating: 4.5,
          facilities: ['food', 'medical', 'pets'],
          contact: {
            phone: '123-456-7890',
            email: 'shelter@example.com',
          },
        },
        // Add more mock shelters...
      ]);
    } catch (error) {
      setSnackbarMessage('Error fetching shelters. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleShelterClick = (shelter) => {
    setSelectedShelter(shelter);
    setOpenDialog(true);
  };

  const handleGetDirections = () => {
    if (selectedShelter) {
      // Open Google Maps with directions
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedShelter.address)}`,
        '_blank'
      );
    }
  };

  const FacilityIcon = ({ type }) => {
    switch (type) {
      case 'food':
        return <FoodIcon color="primary" />;
      case 'medical':
        return <MedicalIcon color="error" />;
      case 'pets':
        return <PetsIcon color="success" />;
      default:
        return <BedIcon color="info" />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Find Nearby Shelters
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Search Settings
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  label="Search Radius (km)"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(e.target.value)}
                  sx={{ mb: 2 }}
                />
                {location && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Your Location
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Latitude: {location.lat}
                      <br />
                      Longitude: {location.lng}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            {shelters.map((shelter) => (
              <Card key={shelter.id} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => handleShelterClick(shelter)}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="h6">{shelter.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationIcon color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {shelter.address} ({shelter.distance})
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        {shelter.facilities.map((facility) => (
                          <Chip
                            key={facility}
                            icon={<FacilityIcon type={facility} />}
                            label={facility.charAt(0).toUpperCase() + facility.slice(1)}
                            size="small"
                          />
                        ))}
                      </Box>
                      <Rating value={shelter.rating} precision={0.5} readOnly size="small" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" color="text.secondary">
                          Capacity
                        </Typography>
                        <Typography variant="h6">
                          {shelter.currentOccupancy}/{shelter.capacity}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedShelter && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selectedShelter.name}
                <IconButton onClick={() => setOpenDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary={selectedShelter.address}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={selectedShelter.contact.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={selectedShelter.contact.email}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Facilities"
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {selectedShelter.facilities.map((facility) => (
                          <Chip
                            key={facility}
                            icon={<FacilityIcon type={facility} />}
                            label={facility.charAt(0).toUpperCase() + facility.slice(1)}
                            size="small"
                          />
                        ))}
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Current Status"
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Occupancy: {selectedShelter.currentOccupancy}/{selectedShelter.capacity}
                        </Typography>
                        <Rating value={selectedShelter.rating} precision={0.5} readOnly size="small" />
                      </Box>
                    }
                  />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button
                variant="contained"
                startIcon={<DirectionsIcon />}
                onClick={handleGetDirections}
              >
                Get Directions
              </Button>
            </DialogActions>
          </>
        )}
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

export default ShelterFinder; 
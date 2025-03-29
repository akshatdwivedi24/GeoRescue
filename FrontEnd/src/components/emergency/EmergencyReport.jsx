import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  PhotoCamera as PhotoIcon,
  Send as SendIcon,
  WarningAmber as EmergencyIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const EmergencyReport = () => {
  const theme = useTheme();
  const [location, setLocation] = useState(null);
  const [incidentType, setIncidentType] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
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
        },
        (error) => {
          console.error('Error getting location:', error);
          setSnackbarMessage('Error getting location. Please enable location services.');
          setOpenSnackbar(true);
        }
      );
    }
  }, []);

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    setMedia([...media, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to submit report
      setSnackbarMessage('Emergency report submitted successfully!');
      setOpenSnackbar(true);
      // Reset form
      setIncidentType('');
      setSeverity('');
      setDescription('');
      setMedia([]);
    } catch (error) {
      setSnackbarMessage('Error submitting report. Please try again.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Emergency Report
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Incident Type</InputLabel>
                        <Select
                          value={incidentType}
                          onChange={(e) => setIncidentType(e.target.value)}
                          label="Incident Type"
                        >
                          <MenuItem value="flood">Flood</MenuItem>
                          <MenuItem value="earthquake">Earthquake</MenuItem>
                          <MenuItem value="fire">Fire</MenuItem>
                          <MenuItem value="storm">Storm</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Severity Level</InputLabel>
                        <Select
                          value={severity}
                          onChange={(e) => setSeverity(e.target.value)}
                          label="Severity Level"
                        >
                          <MenuItem value="low">Low</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="high">High</MenuItem>
                          <MenuItem value="critical">Critical</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<PhotoIcon />}
                        >
                          Upload Media
                          <input
                            type="file"
                            hidden
                            multiple
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                          />
                        </Button>
                        {media.length > 0 && (
                          <Typography variant="body2" color="text.secondary">
                            {media.length} file(s) selected
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        fullWidth
                        size="large"
                        startIcon={<SendIcon />}
                      >
                        Submit Emergency Report
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Emergency Contacts
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Emergency Services: 911
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Police: 100
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fire Department: 101
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ambulance: 102
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Location Information
                </Typography>
                {location ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon color="primary" />
                    <Typography variant="body2">
                      Latitude: {location.lat}
                      <br />
                      Longitude: {location.lng}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Getting location...
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

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

export default EmergencyReport; 
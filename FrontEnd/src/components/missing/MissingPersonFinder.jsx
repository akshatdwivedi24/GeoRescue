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
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  PhotoCamera as PhotoIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const MissingPersonFinder = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [missingPersons, setMissingPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // TODO: Fetch missing persons data
    fetchMissingPersons();
  }, []);

  const fetchMissingPersons = async () => {
    try {
      // Mock data for demonstration
      setMissingPersons([
        {
          id: 1,
          name: 'John Doe',
          age: 25,
          lastSeen: '2024-03-29',
          lastLocation: 'Central Park, City',
          status: 'missing',
          photo: 'https://via.placeholder.com/150',
          description: 'Last seen wearing blue jeans and white t-shirt',
          contact: {
            name: 'Jane Doe',
            phone: '123-456-7890',
            email: 'jane@example.com',
          },
        },
        // Add more mock data...
      ]);
    } catch (error) {
      setSnackbarMessage('Error fetching missing persons data. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setOpenDialog(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // TODO: Implement search functionality
  };

  const handleSubmitReport = async (event) => {
    event.preventDefault();
    // TODO: Implement report submission
    setSnackbarMessage('Missing person report submitted successfully!');
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Missing Person Finder
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="Search Missing Persons" />
          <Tab label="Submit Report" />
        </Tabs>

        {activeTab === 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by name, location, or description..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ mb: 3 }}
              />
            </Grid>

            {missingPersons.map((person) => (
              <Grid item xs={12} sm={6} md={4} key={person.id}>
                <Card
                  sx={{ height: '100%', cursor: 'pointer' }}
                  onClick={() => handlePersonClick(person)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={person.photo}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{person.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Age: {person.age}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Last seen: {person.lastLocation}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {person.lastSeen}
                    </Typography>
                    <Chip
                      label={person.status}
                      color={person.status === 'missing' ? 'error' : 'success'}
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <form onSubmit={handleSubmitReport}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Missing Person's Name"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Age"
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Seen Location"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Seen Date"
                      type="date"
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<PhotoIcon />}
                    >
                      Upload Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit Report
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedPerson && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Missing Person Details
                <IconButton onClick={() => setOpenDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar
                  src={selectedPerson.photo}
                  sx={{ width: 120, height: 120 }}
                >
                  <PersonIcon />
                </Avatar>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Name"
                    secondary={selectedPerson.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Age"
                    secondary={selectedPerson.age}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Last Seen Location"
                    secondary={selectedPerson.lastLocation}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last Seen Date"
                    secondary={selectedPerson.lastSeen}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Description"
                    secondary={selectedPerson.description}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Contact Information"
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          Contact Person: {selectedPerson.contact.name}
                        </Typography>
                        <Typography variant="body2">
                          Phone: {selectedPerson.contact.phone}
                        </Typography>
                        <Typography variant="body2">
                          Email: {selectedPerson.contact.email}
                        </Typography>
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
                startIcon={<CheckCircleIcon />}
                color="success"
              >
                Mark as Found
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

export default MissingPersonFinder; 
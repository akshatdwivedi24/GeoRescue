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
  LinearProgress,
} from '@mui/material';
import {
  AccountBalance as BankIcon,
  CreditCard as CreditCardIcon,
  Payment as PaymentIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const DonationManager = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // TODO: Fetch NGOs data
    fetchNgos();
  }, []);

  const fetchNgos = async () => {
    try {
      // Mock data for demonstration
      setNgos([
        {
          id: 1,
          name: 'Disaster Relief Foundation',
          description: 'Providing immediate relief and long-term support to disaster-affected communities.',
          logo: 'https://via.placeholder.com/150',
          verified: true,
          totalRaised: 50000,
          target: 100000,
          donors: 150,
          projects: [
            {
              name: 'Emergency Food Supply',
              progress: 75,
              description: 'Providing food packages to affected families',
            },
            {
              name: 'Medical Aid',
              progress: 45,
              description: 'Supporting medical camps and supplies',
            },
          ],
          contact: {
            phone: '123-456-7890',
            email: 'contact@relief.org',
            address: '123 Relief Street, City',
          },
        },
        // Add more mock NGOs...
      ]);
    } catch (error) {
      setSnackbarMessage('Error fetching NGOs data. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleNgoClick = (ngo) => {
    setSelectedNgo(ngo);
    setOpenDialog(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDonate = (ngoId) => {
    // TODO: Implement donation flow
    setSnackbarMessage('Redirecting to payment gateway...');
    setOpenSnackbar(true);
  };

  const handleRequestAid = (event) => {
    event.preventDefault();
    // TODO: Implement aid request submission
    setSnackbarMessage('Aid request submitted successfully!');
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Donation & Relief Funds
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="Donate to NGOs" />
          <Tab label="Request Financial Aid" />
        </Tabs>

        {activeTab === 0 ? (
          <Grid container spacing={3}>
            {ngos.map((ngo) => (
              <Grid item xs={12} sm={6} md={4} key={ngo.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={ngo.logo}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      >
                        <BankIcon />
                      </Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6">{ngo.name}</Typography>
                          {ngo.verified && (
                            <VerifiedIcon color="primary" fontSize="small" />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {ngo.donors} donors
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {ngo.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Total Raised: ${ngo.totalRaised.toLocaleString()}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(ngo.totalRaised / ngo.target) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleDonate(ngo.id)}
                    >
                      Donate Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <form onSubmit={handleRequestAid}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Type of Disaster"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Description of Need"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Amount Needed"
                      type="number"
                      required
                      InputProps={{
                        startAdornment: '$',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit Request
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
        {selectedNgo && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selectedNgo.name}
                <IconButton onClick={() => setOpenDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar
                  src={selectedNgo.logo}
                  sx={{ width: 120, height: 120 }}
                >
                  <BankIcon />
                </Avatar>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Description"
                    secondary={selectedNgo.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Progress"
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          ${selectedNgo.totalRaised.toLocaleString()} raised of ${selectedNgo.target.toLocaleString()}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(selectedNgo.totalRaised / selectedNgo.target) * 100}
                          sx={{ mt: 1, height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Active Projects"
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        {selectedNgo.projects.map((project, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2">{project.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {project.description}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={project.progress}
                              sx={{ mt: 1, height: 6, borderRadius: 3 }}
                            />
                          </Box>
                        ))}
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Contact Information"
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                          {selectedNgo.contact.phone}
                        </Typography>
                        <Typography variant="body2">
                          <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                          {selectedNgo.contact.email}
                        </Typography>
                        <Typography variant="body2">
                          <LocationIcon fontSize="small" sx={{ mr: 1 }} />
                          {selectedNgo.contact.address}
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
                color="primary"
                startIcon={<CreditCardIcon />}
                onClick={() => handleDonate(selectedNgo.id)}
              >
                Donate Now
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

export default DonationManager; 
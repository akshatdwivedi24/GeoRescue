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
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Warning as EmergencyIcon,
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

const EmergencyContacts = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    services: [],
    availability: '24/7',
    languages: [],
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/emergency-contacts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddContact = () => {
    setSelectedContact(null);
    setFormData({
      name: '',
      type: '',
      phone: '',
      email: '',
      address: '',
      description: '',
      services: [],
      availability: '24/7',
      languages: [],
    });
    setOpenDialog(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setFormData(contact);
    setOpenDialog(true);
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/emergency-contacts/${contactId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          fetchContacts();
          setSnackbarMessage('Contact deleted successfully!');
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        setSnackbarMessage('Error deleting contact. Please try again.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = selectedContact
        ? `http://localhost:8081/api/emergency-contacts/${selectedContact.id}`
        : 'http://localhost:8081/api/emergency-contacts';
      
      const method = selectedContact ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchContacts();
        setSnackbarMessage(selectedContact ? 'Contact updated successfully!' : 'Contact added successfully!');
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      setSnackbarMessage('Error saving contact. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'emergency':
        return <EmergencyIcon color="error" />;
      case 'police':
        return <PoliceIcon color="primary" />;
      case 'fire':
        return <FireIcon color="error" />;
      case 'medical':
        return <HospitalIcon color="error" />;
      case 'animal':
        return <PetIcon color="success" />;
      case 'child':
        return <ChildIcon color="primary" />;
      case 'elderly':
        return <ElderlyIcon color="primary" />;
      case 'disability':
        return <DisabilityIcon color="primary" />;
      default:
        return <PhoneIcon color="primary" />;
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Emergency Contacts
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search contacts..."
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
                    onClick={handleAddContact}
                  >
                    Add New Contact
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {filteredContacts.map((contact) => (
            <Grid item xs={12} sm={6} md={4} key={contact.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getContactIcon(contact.type)}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {contact.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {contact.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {contact.services.map((service) => (
                      <Chip
                        key={service}
                        label={service.replace('-', ' ')}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{contact.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{contact.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{contact.address}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={contact.availability}
                      color="success"
                      size="small"
                    />
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEditContact(contact)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteContact(contact.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedContact ? 'Edit Contact' : 'Add New Contact'}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  label="Services (comma-separated)"
                  value={formData.services.join(', ')}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value.split(',').map(s => s.trim()) })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Availability"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Languages (comma-separated)"
                  value={formData.languages.join(', ')}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(',').map(s => s.trim()) })}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedContact ? 'Update' : 'Add'}
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

export default EmergencyContacts; 
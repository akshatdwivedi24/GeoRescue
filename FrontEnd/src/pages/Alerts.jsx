import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const severityOptions = ['HIGH', 'MEDIUM', 'LOW'];
const typeOptions = ['EARTHQUAKE', 'FLOOD', 'WILDFIRE', 'STORM', 'OTHER'];

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    severity: '',
    description: '',
    location: {
      latitude: '',
      longitude: '',
      address: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'severity', headerName: 'Severity', width: 130 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'location',
      headerName: 'Location',
      width: 200,
      valueGetter: (params) =>
        `${params.row.location.city}, ${params.row.location.state}`,
    },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 180,
      valueGetter: (params) => new Date(params.row.timestamp).toLocaleString(),
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value ? 'success.main' : 'error.main',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          {params.value ? 'Active' : 'Inactive'}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('/api/alerts');
      setAlerts(response.data);
    } catch (error) {
      toast.error('Error fetching alerts');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setSelectedAlert(null);
    setFormData({
      type: '',
      severity: '',
      description: '',
      location: {
        latitude: '',
        longitude: '',
        address: '',
        city: '',
        state: '',
        country: '',
      },
    });
    setOpenDialog(true);
  };

  const handleEdit = (alert) => {
    setSelectedAlert(alert);
    setFormData({
      type: alert.type,
      severity: alert.severity,
      description: alert.description,
      location: { ...alert.location },
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAlert(null);
  };

  const handleSubmit = async () => {
    try {
      if (selectedAlert) {
        await axios.put(`/api/alerts/${selectedAlert.id}`, formData);
        toast.success('Alert updated successfully');
      } else {
        await axios.post('/api/alerts', formData);
        toast.success('Alert created successfully');
      }
      handleCloseDialog();
      fetchAlerts();
    } catch (error) {
      toast.error('Error saving alert');
      console.error('Error:', error);
    }
  };

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Alerts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          New Alert
        </Button>
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={alerts}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedAlert ? 'Edit Alert' : 'Create New Alert'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              select
              label="Type"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              fullWidth
            >
              {typeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Severity"
              value={formData.severity}
              onChange={(e) => handleChange('severity', e.target.value)}
              fullWidth
            >
              {severityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              multiline
              rows={4}
              fullWidth
            />

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Location Details
            </Typography>

            <TextField
              label="Latitude"
              value={formData.location.latitude}
              onChange={(e) => handleChange('location.latitude', e.target.value)}
              type="number"
              fullWidth
            />

            <TextField
              label="Longitude"
              value={formData.location.longitude}
              onChange={(e) => handleChange('location.longitude', e.target.value)}
              type="number"
              fullWidth
            />

            <TextField
              label="Address"
              value={formData.location.address}
              onChange={(e) => handleChange('location.address', e.target.value)}
              fullWidth
            />

            <TextField
              label="City"
              value={formData.location.city}
              onChange={(e) => handleChange('location.city', e.target.value)}
              fullWidth
            />

            <TextField
              label="State"
              value={formData.location.state}
              onChange={(e) => handleChange('location.state', e.target.value)}
              fullWidth
            />

            <TextField
              label="Country"
              value={formData.location.country}
              onChange={(e) => handleChange('location.country', e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedAlert ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Alerts; 
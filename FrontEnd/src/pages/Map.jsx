import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom marker icons
const createCustomIcon = (color) =>
  new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: `custom-icon-${color}`, // You can add custom CSS to change the marker color
  });

const Map = () => {
  const [markers, setMarkers] = useState({
    alerts: [],
    incidents: [],
    shelters: [],
    operations: [],
  });
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default center (India)

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const [alertsRes, incidentsRes, sheltersRes, operationsRes] = await Promise.all([
          axios.get('/api/alerts'),
          axios.get('/api/incidents'),
          axios.get('/api/shelters'),
          axios.get('/api/rescue-operations'),
        ]);

        setMarkers({
          alerts: alertsRes.data,
          incidents: incidentsRes.data,
          shelters: sheltersRes.data,
          operations: operationsRes.data,
        });

        // Set center to the first alert location if available
        if (alertsRes.data.length > 0) {
          setCenter([alertsRes.data[0].latitude, alertsRes.data[0].longitude]);
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
        toast.error('Failed to load map data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkers();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, height: 'calc(100vh - 128px)' }}>
      <Typography variant="h4" gutterBottom>
        Emergency Map
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: 'calc(100% - 48px)',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        <MapContainer
          center={center}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Render Alerts */}
          {markers.alerts.map((alert) => (
            <Marker
              key={`alert-${alert.id}`}
              position={[alert.latitude, alert.longitude]}
              icon={createCustomIcon('red')}
            >
              <Popup>
                <Typography variant="subtitle1">{alert.title}</Typography>
                <Typography variant="body2">{alert.description}</Typography>
                <Typography variant="caption">Severity: {alert.severity}</Typography>
              </Popup>
            </Marker>
          ))}

          {/* Render Incidents */}
          {markers.incidents.map((incident) => (
            <Marker
              key={`incident-${incident.id}`}
              position={[incident.latitude, incident.longitude]}
              icon={createCustomIcon('orange')}
            >
              <Popup>
                <Typography variant="subtitle1">{incident.title}</Typography>
                <Typography variant="body2">{incident.description}</Typography>
                <Typography variant="caption">Status: {incident.status}</Typography>
              </Popup>
            </Marker>
          ))}

          {/* Render Shelters */}
          {markers.shelters.map((shelter) => (
            <Marker
              key={`shelter-${shelter.id}`}
              position={[shelter.latitude, shelter.longitude]}
              icon={createCustomIcon('green')}
            >
              <Popup>
                <Typography variant="subtitle1">{shelter.name}</Typography>
                <Typography variant="body2">Capacity: {shelter.capacity}</Typography>
                <Typography variant="caption">Status: {shelter.status}</Typography>
              </Popup>
            </Marker>
          ))}

          {/* Render Rescue Operations */}
          {markers.operations.map((operation) => (
            <Marker
              key={`operation-${operation.id}`}
              position={[operation.latitude, operation.longitude]}
              icon={createCustomIcon('blue')}
            >
              <Popup>
                <Typography variant="subtitle1">{operation.title}</Typography>
                <Typography variant="body2">{operation.description}</Typography>
                <Typography variant="caption">Status: {operation.status}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Paper>
    </Container>
  );
};

export default Map; 
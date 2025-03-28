import { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { toast } from 'react-toastify';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icons for different types of markers
const icons = {
  alert: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  incident: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  shelter: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  operation: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

function MapComponent() {
  const [markers, setMarkers] = useState({
    alerts: [],
    incidents: [],
    shelters: [],
    operations: [],
  });
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alertsRes, incidentsRes, sheltersRes, operationsRes] = await Promise.all([
          axios.get('/api/alerts/active'),
          axios.get('/api/incidents/active'),
          axios.get('/api/shelters'),
          axios.get('/api/rescue-operations/active'),
        ]);

        setMarkers({
          alerts: alertsRes.data,
          incidents: incidentsRes.data,
          shelters: sheltersRes.data,
          operations: operationsRes.data,
        });

        // Set initial center based on the first marker
        const firstLocation = alertsRes.data[0]?.location || incidentsRes.data[0]?.location;
        if (firstLocation) {
          setCenter([firstLocation.latitude, firstLocation.longitude]);
        }
      } catch (error) {
        toast.error('Error fetching map data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <Typography variant="h4" component="h1" gutterBottom>
        Interactive Map
      </Typography>
      <Paper sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Alert Markers */}
          {markers.alerts.map((alert) => (
            <Marker
              key={alert.id}
              position={[alert.location.latitude, alert.location.longitude]}
              icon={icons.alert}
            >
              <Popup>
                <Typography variant="subtitle1" fontWeight="bold">
                  Alert: {alert.type}
                </Typography>
                <Typography variant="body2">
                  Severity: {alert.severity}
                </Typography>
                <Typography variant="body2">
                  {alert.description}
                </Typography>
              </Popup>
            </Marker>
          ))}

          {/* Incident Markers */}
          {markers.incidents.map((incident) => (
            <Marker
              key={incident.id}
              position={[incident.location.latitude, incident.location.longitude]}
              icon={icons.incident}
            >
              <Popup>
                <Typography variant="subtitle1" fontWeight="bold">
                  Incident: {incident.type}
                </Typography>
                <Typography variant="body2">
                  Priority: {incident.priority}
                </Typography>
                <Typography variant="body2">
                  {incident.description}
                </Typography>
              </Popup>
            </Marker>
          ))}

          {/* Shelter Markers */}
          {markers.shelters.map((shelter) => (
            <Marker
              key={shelter.id}
              position={[shelter.location.latitude, shelter.location.longitude]}
              icon={icons.shelter}
            >
              <Popup>
                <Typography variant="subtitle1" fontWeight="bold">
                  {shelter.name}
                </Typography>
                <Typography variant="body2">
                  Status: {shelter.status}
                </Typography>
                <Typography variant="body2">
                  Capacity: {shelter.currentOccupancy}/{shelter.capacity}
                </Typography>
              </Popup>
            </Marker>
          ))}

          {/* Operation Markers */}
          {markers.operations.map((operation) => (
            <Marker
              key={operation.id}
              position={[operation.targetLocation.latitude, operation.targetLocation.longitude]}
              icon={icons.operation}
            >
              <Popup>
                <Typography variant="subtitle1" fontWeight="bold">
                  Rescue Operation
                </Typography>
                <Typography variant="body2">
                  Status: {operation.status}
                </Typography>
                <Typography variant="body2">
                  Priority: {operation.priority}
                </Typography>
                <Typography variant="body2">
                  {operation.description}
                </Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Paper>
    </Container>
  );
}

export default MapComponent; 
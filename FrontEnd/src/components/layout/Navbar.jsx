import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Notifications,
  Report,
  LocalHospital,
  LocalPolice,
  Contacts,
  Map,
  Logout,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const pages = [
  { name: 'Dashboard', path: '/', icon: <Dashboard /> },
  { name: 'Alerts', path: '/alerts', icon: <Notifications /> },
  { name: 'Incidents', path: '/incidents', icon: <Report /> },
  { name: 'Shelters', path: '/shelters', icon: <LocalHospital /> },
  { name: 'Rescue Operations', path: '/rescue-operations', icon: <LocalPolice /> },
  { name: 'Emergency Contacts', path: '/emergency-contacts', icon: <Contacts /> },
  { name: 'Map', path: '/map', icon: <Map /> },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { logout, isAuthenticated, user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout failed:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          GeoRescue
        </Typography>
      </Toolbar>
      <List>
        {pages.map((page) => (
          <ListItem
            button
            key={page.name}
            onClick={() => {
              if (!isAuthenticated && page.path !== '/') {
                toast.warning('Please login to access this feature');
                navigate('/login');
                return;
              }
              navigate(page.path);
              if (isMobile) handleDrawerToggle();
            }}
          >
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
        {isAuthenticated ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button onClick={handleLogin}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          GeoRescue
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              color="inherit"
              startIcon={page.icon}
              onClick={() => {
                if (!isAuthenticated && page.path !== '/') {
                  toast.warning('Please login to access this feature');
                  navigate('/login');
                  return;
                }
                navigate(page.path);
              }}
              sx={{
                mx: 1,
                color: location.pathname === page.path ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {page.name}
            </Button>
          ))}
          {isAuthenticated ? (
            <Button
              color="inherit"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              sx={{
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 
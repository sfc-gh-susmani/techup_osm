import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Chip
} from '@mui/material';
import {
  Dashboard,
  TableChart,
  Assessment,
  Rule,
  Settings,
  AcUnit
} from '@mui/icons-material';

// Import pages
import ModernOverview from './pages/ModernOverview';
import TableMetrics from './pages/TableMetrics';
import Statistics from './pages/Statistics';
import CustomRules from './pages/CustomRules';

const drawerWidth = 260;

// Create modern theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Modern blue
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#059669', // Modern green
      light: '#10b981',
      dark: '#047857',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    error: {
      main: '#dc2626',
      light: '#ef4444',
    },
    warning: {
      main: '#d97706',
      light: '#f59e0b',
    },
    success: {
      main: '#059669',
      light: '#10b981',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

// Navigation items
const navigationItems = [
  {
    label: 'Overview',
    path: '/',
    icon: <Dashboard />
  },
  {
    label: 'Table Metrics',
    path: '/table-metrics',
    icon: <TableChart />
  },
  {
    label: 'Statistics',
    path: '/statistics',
    icon: <Assessment />
  },
  {
    label: 'Custom Rules',
    path: '/custom-rules',
    icon: <Rule />
  }
];

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      }}
    >
      {/* Logo/Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <AcUnit sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Data Quality
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Monitor
            </Typography>
          </Box>
        </Box>
        <Chip 
          label="SFSENORTHAMERICA-DEMO_OSM" 
          size="small" 
          variant="outlined"
          sx={{ 
            fontSize: '0.7rem',
            backgroundColor: '#f1f5f9',
            borderColor: '#cbd5e1',
            color: '#475569'
          }}
        />
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 1.5, pt: 0.5 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '10px',
                transition: 'all 0.2s ease-in-out',
                minHeight: 44,
                '&.Mui-selected': {
                  backgroundColor: '#2563eb',
                  color: 'white',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                  '&:hover': {
                    backgroundColor: '#1d4ed8',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? '#1d4ed8' : '#f1f5f9',
                },
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 36,
                color: location.pathname === item.path ? 'white' : '#64748b'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  color: location.pathname === item.path ? 'white' : '#334155'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Bottom section */}
      <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid #e2e8f0' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
          Data Quality Monitoring
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
          Built for TechUp 2025 Hackathon
        </Typography>
      </Box>
    </Drawer>
  );
};

const MainContent: React.FC = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        ml: `${drawerWidth}px`,
        minHeight: '100vh',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Routes>
        <Route path="/" element={<ModernOverview />} />
        <Route path="/table-metrics" element={<TableMetrics />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/custom-rules" element={<CustomRules />} />
      </Routes>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Navigation />
          <MainContent />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
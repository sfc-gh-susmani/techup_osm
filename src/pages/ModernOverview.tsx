import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Tooltip,
  Button
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  TableChart,
  Warning,
  CheckCircle,
  Error,
  TrendingUp,
  TrendingDown,
  MoreVert,
  Refresh,
  FilterList,
  Search
} from '@mui/icons-material';
import { DashboardStats, TableQuality } from '../types';

// Enhanced mock data with more realistic values
const mockStats: DashboardStats = {
  totalTables: 847,
  healthyTables: 738,
  tablesWithWarnings: 89,
  criticalTables: 20,
  totalRules: 156,
  activeRules: 142,
  lastRefresh: new Date()
};

const mockTables: TableQuality[] = [
  {
    tableName: 'CUSTOMER_PROFILES',
    schemaName: 'PROD',
    databaseName: 'ANALYTICS_DB',
    overallScore: 0.96,
    metrics: [],
    lastChecked: new Date(),
    rowCount: 2450000,
    issueCount: 2,
    status: 'healthy'
  },
  {
    tableName: 'TRANSACTION_HISTORY',
    schemaName: 'SALES',
    databaseName: 'TRANSACTIONAL_DB',
    overallScore: 0.88,
    metrics: [],
    lastChecked: new Date(),
    rowCount: 12500000,
    issueCount: 8,
    status: 'warning'
  },
  {
    tableName: 'LEGACY_ORDERS',
    schemaName: 'ARCHIVE',
    databaseName: 'HISTORICAL_DB',
    overallScore: 0.67,
    metrics: [],
    lastChecked: new Date(),
    rowCount: 850000,
    issueCount: 24,
    status: 'critical'
  },
  {
    tableName: 'USER_SESSIONS',
    schemaName: 'ANALYTICS',
    databaseName: 'BEHAVIORAL_DB',
    overallScore: 0.94,
    metrics: [],
    lastChecked: new Date(),
    rowCount: 8900000,
    issueCount: 3,
    status: 'healthy'
  },
  {
    tableName: 'PRODUCT_INVENTORY',
    schemaName: 'SUPPLY_CHAIN',
    databaseName: 'OPERATIONS_DB',
    overallScore: 0.82,
    metrics: [],
    lastChecked: new Date(),
    rowCount: 156000,
    issueCount: 12,
    status: 'warning'
  }
];

const ModernOverview: React.FC = () => {
  const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
    }
  };

  const getStatusIcon = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return <CheckCircle sx={{ color: '#059669', fontSize: 18 }} />;
      case 'warning': return <Warning sx={{ color: '#d97706', fontSize: 18 }} />;
      case 'critical': return <Error sx={{ color: '#dc2626', fontSize: 18 }} />;
    }
  };

  const getStatusBadge = (status: 'healthy' | 'warning' | 'critical') => {
    const colors = {
      healthy: { bg: '#ecfdf5', color: '#059669', border: '#10b981' },
      warning: { bg: '#fffbeb', color: '#d97706', border: '#f59e0b' },
      critical: { bg: '#fef2f2', color: '#dc2626', border: '#ef4444' }
    };
    
    return (
      <Box
        sx={{
          px: 2,
          py: 0.5,
          borderRadius: '6px',
          backgroundColor: colors[status].bg,
          border: `1px solid ${colors[status].border}20`,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5
        }}
      >
        {getStatusIcon(status)}
        <Typography
          variant="body2"
          sx={{
            color: colors[status].color,
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {status}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 4, maxWidth: '100%' }}>
      {/* Modern Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#1e293b',
                mb: 1
              }}
            >
              Data Quality Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Monitor and track data quality across all tables • Last updated {mockStats.lastRefresh.toLocaleTimeString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ borderRadius: '8px' }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              sx={{ borderRadius: '8px' }}
            >
              Refresh
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Total Tables
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                    {mockStats.totalTables.toLocaleString()}
                  </Typography>
                </Box>
                <TableChart sx={{ opacity: 0.8, fontSize: 28 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                  +12% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Healthy Tables
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, color: '#059669' }}>
                    {mockStats.healthyTables}
                  </Typography>
                </Box>
                <CheckCircle sx={{ color: '#059669', fontSize: 28 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp sx={{ fontSize: 16, color: '#059669' }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  {Math.round((mockStats.healthyTables / mockStats.totalTables) * 100)}% of total
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Warnings
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, color: '#d97706' }}>
                    {mockStats.tablesWithWarnings}
                  </Typography>
                </Box>
                <Warning sx={{ color: '#d97706', fontSize: 28 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingDown sx={{ fontSize: 16, color: '#d97706' }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  -8% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Critical Issues
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, color: '#dc2626' }}>
                    {mockStats.criticalTables}
                  </Typography>
                </Box>
                <Error sx={{ color: '#dc2626', fontSize: 28 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp sx={{ fontSize: 16, color: '#dc2626' }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  Requires attention
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table Quality List */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Table Quality Status
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Search tables">
                  <IconButton size="small">
                    <Search />
                  </IconButton>
                </Tooltip>
                <Tooltip title="More options">
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          
          {mockTables.map((table, index) => (
            <Box
              key={`${table.databaseName}.${table.schemaName}.${table.tableName}`}
              sx={{
                p: 3,
                borderBottom: index < mockTables.length - 1 ? '1px solid #e2e8f0' : 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                },
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: table.status === 'healthy' ? '#ecfdf5' : 
                                       table.status === 'warning' ? '#fffbeb' : '#fef2f2',
                        color: table.status === 'healthy' ? '#059669' : 
                              table.status === 'warning' ? '#d97706' : '#dc2626',
                      }}
                    >
                      <TableChart />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {table.tableName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {table.databaseName}.{table.schemaName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {table.rowCount?.toLocaleString()} rows
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                      Quality Score
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={table.overallScore * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#e2e8f0',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              backgroundColor: table.status === 'healthy' ? '#059669' : 
                                             table.status === 'warning' ? '#d97706' : '#dc2626',
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: '40px' }}>
                        {Math.round(table.overallScore * 100)}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={2}>
                  {getStatusBadge(table.status)}
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Last checked: {table.lastChecked.toLocaleTimeString()}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#059669',
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {table.issueCount} issues detected
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModernOverview;

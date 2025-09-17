import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TableChart,
  CheckCircle,
  Warning,
  Error,
  TrendingUp,
  TrendingDown,
  FilterList,
  Refresh,
  Search,
  MoreVert
} from '@mui/icons-material';
import { TableOverview } from '../types';

const ModernOverviewFixed: React.FC = () => {
  // Mock data for demonstration
  const mockStats = {
    totalTables: 847,
    healthyTables: 738,
    warningTables: 89,
    criticalTables: 20,
    lastRefresh: new Date(),
  };

  const mockTables: TableOverview[] = [
    {
      id: '1',
      databaseName: 'ANALYTICS_DB',
      schemaName: 'PROD',
      tableName: 'CUSTOMER_PROFILES',
      overallScore: 96,
      status: 'healthy',
      issueCount: 2,
      lastChecked: new Date(),
      rowCount: 2450000,
    },
    {
      id: '2',
      databaseName: 'TRANSACTIONAL_DB',
      schemaName: 'SALES',
      tableName: 'TRANSACTION_HISTORY',
      overallScore: 88,
      status: 'warning',
      issueCount: 8,
      lastChecked: new Date(),
      rowCount: 12500000,
    },
    {
      id: '3',
      databaseName: 'HISTORICAL_DB',
      schemaName: 'ARCHIVE',
      tableName: 'LEGACY_ORDERS',
      overallScore: 67,
      status: 'critical',
      issueCount: 24,
      lastChecked: new Date(),
      rowCount: 850000,
    },
  ];

  const getStatusBadge = (status: 'healthy' | 'warning' | 'critical') => {
    const config = {
      healthy: { color: 'success' as const, label: 'HEALTHY' },
      warning: { color: 'warning' as const, label: 'WARNING' },
      critical: { color: 'error' as const, label: 'CRITICAL' },
    };
    
    return (
      <Chip
        label={config[status].label}
        color={config[status].color}
        size="small"
        sx={{ fontWeight: 600, fontSize: '0.7rem' }}
      />
    );
  };

  return (
    <Box sx={{ p: 0.5, maxWidth: '100%' }}>
      {/* Modern Header */}
      <Box sx={{ mb: 0.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.5 }}>
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
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 1,
        mb: 1
      }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none'
        }}>
          <CardContent sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.25 }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  Total Tables
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.25, fontSize: '1.6rem', lineHeight: 1.1 }}>
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
        
        <Card>
          <CardContent sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.25 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Healthy Tables
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5, fontSize: '1.8rem', lineHeight: 1.2, color: '#059669' }}>
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
        
        <Card>
          <CardContent sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.25 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Warnings
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5, fontSize: '1.8rem', lineHeight: 1.2, color: '#d97706' }}>
                  {mockStats.warningTables}
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
        
        <Card>
          <CardContent sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.25 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Critical Issues
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mt: 0.5, fontSize: '1.8rem', lineHeight: 1.2, color: '#dc2626' }}>
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
      </Box>

      {/* Table Quality List */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 1, borderBottom: '1px solid #e2e8f0' }}>
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
                p: 1,
                borderBottom: index < mockTables.length - 1 ? '1px solid #e2e8f0' : 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                },
              }}
            >
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '2fr 1.5fr 1fr 1.5fr' },
                gap: 1,
                alignItems: 'center'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
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
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      {table.rowCount?.toLocaleString()} rows
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
                    Quality Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 6,
                        backgroundColor: '#e2e8f0',
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${table.overallScore}%`,
                          height: '100%',
                          backgroundColor: table.status === 'healthy' ? '#059669' : 
                                          table.status === 'warning' ? '#d97706' : '#dc2626',
                          borderRadius: 3,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                      {table.overallScore}%
                    </Typography>
                  </Box>
                </Box>
                
                {getStatusBadge(table.status)}
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    Last checked: {table.lastChecked.toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    • {table.issueCount} issues detected
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModernOverviewFixed;

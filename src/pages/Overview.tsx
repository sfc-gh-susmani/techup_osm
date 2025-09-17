import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  TableChart,
  Warning,
  CheckCircle,
  Error,
  TrendingUp
} from '@mui/icons-material';
import { DashboardStats, TableQuality } from '../types';

// Mock data for initial design
const mockStats: DashboardStats = {
  totalTables: 150,
  healthyTables: 128,
  tablesWithWarnings: 18,
  criticalTables: 4,
  totalRules: 45,
  activeRules: 42,
  lastRefresh: new Date()
};

const mockTables: TableQuality[] = [
  {
    tableName: 'CUSTOMER_DATA',
    schemaName: 'SALES',
    databaseName: 'PROD_DB',
    overallScore: 0.92,
    metrics: [],
    lastChecked: new Date(),
    rowCount: 1250000,
    issueCount: 2,
    status: 'healthy'
  },
  {
    tableName: 'ORDER_HISTORY',
    schemaName: 'SALES',
    databaseName: 'PROD_DB',
    overallScore: 0.78,
    metrics: [],
    lastChecked: new Date(),
    rowCount: 890000,
    issueCount: 5,
    status: 'warning'
  },
  {
    tableName: 'PRODUCT_CATALOG',
    schemaName: 'INVENTORY',
    databaseName: 'PROD_DB',
    overallScore: 0.45,
    metrics: [],
    lastChecked: new Date(),
    rowCount: 15000,
    issueCount: 12,
    status: 'critical'
  }
];

const Overview: React.FC = () => {
  const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
    }
  };

  const getStatusIcon = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return <CheckCircle color="success" />;
      case 'warning': return <Warning color="warning" />;
      case 'critical': return <Error color="error" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Data Quality Overview
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Monitor data quality across all tables in your Snowflake account
        </Typography>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TableChart color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Tables</Typography>
              </Box>
              <Typography variant="h3">{mockStats.totalTables}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Healthy</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {mockStats.healthyTables}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Warning color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Warnings</Typography>
              </Box>
              <Typography variant="h3" color="warning.main">
                {mockStats.tablesWithWarnings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Error color="error" sx={{ mr: 1 }} />
                <Typography variant="h6">Critical</Typography>
              </Box>
              <Typography variant="h3" color="error.main">
                {mockStats.criticalTables}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table Quality Summary */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Table Quality Summary
        </Typography>
        
        {mockTables.map((table) => (
          <Card key={`${table.databaseName}.${table.schemaName}.${table.tableName}`} 
                sx={{ mb: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {getStatusIcon(table.status)}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {table.tableName}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {table.databaseName}.{table.schemaName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {table.rowCount?.toLocaleString()} rows
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Typography variant="body2" gutterBottom>
                    Quality Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={table.overallScore * 100}
                        color={getStatusColor(table.status)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round(table.overallScore * 100)}%
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={2}>
                  <Chip 
                    label={`${table.issueCount} issues`}
                    color={table.issueCount === 0 ? 'success' : 
                           table.issueCount <= 3 ? 'warning' : 'error'}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Last checked: {table.lastChecked.toLocaleTimeString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <TrendingUp color="success" sx={{ mr: 0.5, fontSize: 16 }} />
                    <Typography variant="body2" color="success.main">
                      Stable
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </Box>
  );
};

export default Overview;

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Search,
  Refresh,
  FilterList,
  Assessment
} from '@mui/icons-material';
import { SYSTEM_DMFS, DMF_CATEGORIES } from '../constants/dmfs';
import { QualityMetric, DMFCategory } from '../types';

// Mock data for table metrics
const mockMetrics: QualityMetric[] = [
  {
    id: '1',
    tableName: 'CUSTOMER_DATA',
    schemaName: 'SALES',
    databaseName: 'PROD_DB',
    dmf: SYSTEM_DMFS[0], // BLANK_COUNT
    value: 150,
    threshold: 100,
    status: 'failed',
    lastUpdated: new Date(),
    trend: 'degrading'
  },
  {
    id: '2',
    tableName: 'CUSTOMER_DATA',
    schemaName: 'SALES',
    databaseName: 'PROD_DB',
    dmf: SYSTEM_DMFS[2], // NULL_COUNT
    value: 45,
    threshold: 50,
    status: 'passed',
    lastUpdated: new Date(),
    trend: 'improving'
  },
  {
    id: '3',
    tableName: 'ORDER_HISTORY',
    schemaName: 'SALES',
    databaseName: 'PROD_DB',
    dmf: SYSTEM_DMFS[13], // ROW_COUNT
    value: 890000,
    status: 'passed',
    lastUpdated: new Date(),
    trend: 'stable'
  },
  {
    id: '4',
    tableName: 'PRODUCT_CATALOG',
    schemaName: 'INVENTORY',
    databaseName: 'PROD_DB',
    dmf: SYSTEM_DMFS[1], // BLANK_PERCENT
    value: 15.5,
    threshold: 5,
    status: 'failed',
    lastUpdated: new Date(),
    trend: 'degrading'
  }
];

const TableMetrics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DMFCategory | 'All'>('All');
  const [filteredMetrics, setFilteredMetrics] = useState(mockMetrics);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'success';
      case 'failed': return 'error';
      case 'warning': return 'warning';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'degrading': return '📉';
      case 'stable': return '➡️';
      default: return '';
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterMetrics(term, selectedCategory);
  };

  const handleCategoryFilter = (category: DMFCategory | 'All') => {
    setSelectedCategory(category);
    filterMetrics(searchTerm, category);
  };

  const filterMetrics = (search: string, category: DMFCategory | 'All') => {
    let filtered = mockMetrics;

    if (search) {
      filtered = filtered.filter(metric =>
        metric.tableName.toLowerCase().includes(search.toLowerCase()) ||
        metric.schemaName.toLowerCase().includes(search.toLowerCase()) ||
        metric.databaseName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter(metric => metric.dmf.category === category);
    }

    setFilteredMetrics(filtered);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Table Metrics
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Detailed view of data quality metrics across all tables using Snowflake DMFs
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search tables, schemas, or databases..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>DMF Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="DMF Category"
                  onChange={(e) => handleCategoryFilter(e.target.value as DMFCategory | 'All')}
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  {DMF_CATEGORIES.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Tooltip title="Refresh Metrics">
                <IconButton color="primary">
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredMetrics.length} of {mockMetrics.length} metrics
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Metrics Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Table</TableCell>
              <TableCell>DMF</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Threshold</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Trend</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMetrics.map((metric) => (
              <TableRow key={metric.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2">
                      {metric.tableName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.databaseName}.{metric.schemaName}
                    </Typography>
                  </Box>
                </TableCell>
                
                <TableCell>
                  <Tooltip title={metric.dmf.description}>
                    <Typography variant="body2">
                      {metric.dmf.name}
                    </Typography>
                  </Tooltip>
                </TableCell>
                
                <TableCell>
                  <Chip 
                    label={metric.dmf.category}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                
                <TableCell align="right">
                  <Typography variant="body2">
                    {typeof metric.value === 'number' 
                      ? metric.value.toLocaleString() 
                      : metric.value}
                  </Typography>
                </TableCell>
                
                <TableCell align="right">
                  <Typography variant="body2" color="text.secondary">
                    {metric.threshold?.toLocaleString() || 'N/A'}
                  </Typography>
                </TableCell>
                
                <TableCell>
                  <Chip 
                    label={metric.status.toUpperCase()}
                    color={getStatusColor(metric.status)}
                    size="small"
                  />
                </TableCell>
                
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {getTrendIcon(metric.trend)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.trend || 'N/A'}
                    </Typography>
                  </Box>
                </TableCell>
                
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {metric.lastUpdated.toLocaleString()}
                  </Typography>
                </TableCell>
                
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton size="small">
                      <Assessment />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableMetrics;

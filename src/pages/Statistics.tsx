import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SYSTEM_DMFS } from '../constants/dmfs';

// Mock data for statistical analysis
const mockStatisticalData = [
  { name: 'CUSTOMER_DATA', nullPercent: 2.1, blankPercent: 1.5, duplicateCount: 45, uniqueCount: 124800 },
  { name: 'ORDER_HISTORY', nullPercent: 0.8, blankPercent: 0.3, duplicateCount: 12, uniqueCount: 889800 },
  { name: 'PRODUCT_CATALOG', nullPercent: 15.2, blankPercent: 8.7, duplicateCount: 156, uniqueCount: 14800 },
  { name: 'USER_PROFILES', nullPercent: 3.4, blankPercent: 2.1, duplicateCount: 78, uniqueCount: 456700 },
  { name: 'TRANSACTIONS', nullPercent: 0.2, blankPercent: 0.1, duplicateCount: 3, uniqueCount: 2100000 }
];

const mockTrendData = [
  { date: '2024-01-01', accuracy: 95.2, freshness: 98.1, completeness: 92.3 },
  { date: '2024-01-02', accuracy: 94.8, freshness: 97.9, completeness: 93.1 },
  { date: '2024-01-03', accuracy: 95.5, freshness: 98.3, completeness: 92.8 },
  { date: '2024-01-04', accuracy: 96.1, freshness: 98.0, completeness: 94.2 },
  { date: '2024-01-05', accuracy: 95.8, freshness: 97.7, completeness: 93.5 }
];

const mockCategoryDistribution = [
  { name: 'Accuracy Issues', value: 35, color: '#ff6b6b' },
  { name: 'Freshness Issues', value: 20, color: '#ffd93d' },
  { name: 'Uniqueness Issues', value: 25, color: '#6bcf7f' },
  { name: 'Volume Issues', value: 15, color: '#4ecdc4' },
  { name: 'Other', value: 5, color: '#95e1d3' }
];

const Statistics: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState('ALL');
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('trends');

  const statisticalDMFs = SYSTEM_DMFS.filter(dmf => dmf.category === 'Statistics');

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Statistical Analysis
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Deep dive into data quality statistics using Snowflake DMF analytics
        </Typography>
      </Box>

      {/* Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Table Selection</InputLabel>
                <Select
                  value={selectedTable}
                  label="Table Selection"
                  onChange={(e) => setSelectedTable(e.target.value)}
                >
                  <MenuItem value="ALL">All Tables</MenuItem>
                  <MenuItem value="CUSTOMER_DATA">Customer Data</MenuItem>
                  <MenuItem value="ORDER_HISTORY">Order History</MenuItem>
                  <MenuItem value="PRODUCT_CATALOG">Product Catalog</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  label="Time Range"
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <MenuItem value="1d">Last 24 Hours</MenuItem>
                  <MenuItem value="7d">Last 7 Days</MenuItem>
                  <MenuItem value="30d">Last 30 Days</MenuItem>
                  <MenuItem value="90d">Last 90 Days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={(_, newType) => newType && setChartType(newType)}
                aria-label="chart type"
              >
                <ToggleButton value="trends" aria-label="trends">
                  Quality Trends
                </ToggleButton>
                <ToggleButton value="distribution" aria-label="distribution">
                  Issue Distribution
                </ToggleButton>
                <ToggleButton value="comparison" aria-label="comparison">
                  Table Comparison
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Statistical DMFs Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statisticalDMFs.map((dmf) => (
          <Grid item xs={12} sm={6} md={3} key={dmf.name}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {dmf.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {dmf.description}
                </Typography>
                <Typography variant="h4" color="primary">
                  {dmf.name === 'AVG' ? '€2.1K' :
                   dmf.name === 'MAX' ? '€15.8K' :
                   dmf.name === 'MIN' ? '€0.01' :
                   '±€892'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {chartType === 'trends' && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Data Quality Trends Over Time
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Accuracy %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="freshness" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      name="Freshness %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completeness" 
                      stroke="#ffc658" 
                      strokeWidth={2}
                      name="Completeness %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        )}

        {chartType === 'distribution' && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Issue Category Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockCategoryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                      {mockCategoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        )}

        {chartType === 'comparison' && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Table Quality Comparison
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockStatisticalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="nullPercent" fill="#ff6b6b" name="NULL %" />
                    <Bar dataKey="blankPercent" fill="#ffd93d" name="Blank %" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Data Volume Statistics
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockStatisticalData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Unique Records']} />
                  <Bar dataKey="uniqueCount" fill="#4ecdc4" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;

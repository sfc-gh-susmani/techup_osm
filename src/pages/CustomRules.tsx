import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PlayArrow,
  Pause,
  Code,
  Schedule,
  Warning
} from '@mui/icons-material';
import { CustomRule } from '../types';

// Mock custom rules data
const mockCustomRules: CustomRule[] = [
  {
    id: '1',
    name: 'Email Format Validation',
    description: 'Ensures all email addresses in customer table follow proper format',
    sqlQuery: `SELECT COUNT(*) as invalid_emails 
FROM PROD_DB.SALES.CUSTOMER_DATA 
WHERE email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'`,
    threshold: 5,
    severity: 'high',
    enabled: true,
    schedule: '0 8 * * *', // Daily at 8 AM
    createdBy: 'john.doe@company.com',
    createdAt: new Date('2024-01-15'),
    lastRun: new Date('2024-01-20T08:00:00')
  },
  {
    id: '2',
    name: 'Revenue Data Consistency',
    description: 'Checks for negative revenue values that should not exist',
    sqlQuery: `SELECT COUNT(*) as negative_revenue_count
FROM PROD_DB.SALES.ORDER_HISTORY 
WHERE total_amount < 0`,
    threshold: 0,
    severity: 'critical',
    enabled: true,
    schedule: '*/30 * * * *', // Every 30 minutes
    createdBy: 'jane.smith@company.com',
    createdAt: new Date('2024-01-10'),
    lastRun: new Date('2024-01-20T09:30:00')
  },
  {
    id: '3',
    name: 'Product Code Uniqueness',
    description: 'Ensures product codes are unique across the catalog',
    sqlQuery: `SELECT COUNT(*) - COUNT(DISTINCT product_code) as duplicate_codes
FROM PROD_DB.INVENTORY.PRODUCT_CATALOG`,
    threshold: 0,
    severity: 'medium',
    enabled: false,
    schedule: '0 0 * * 0', // Weekly on Sunday
    createdBy: 'mike.johnson@company.com',
    createdAt: new Date('2024-01-05'),
    lastRun: new Date('2024-01-14T00:00:00')
  }
];

const CustomRules: React.FC = () => {
  const [rules, setRules] = useState<CustomRule[]>(mockCustomRules);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<CustomRule | null>(null);
  const [newRule, setNewRule] = useState<Partial<CustomRule>>({
    name: '',
    description: '',
    sqlQuery: '',
    threshold: 0,
    severity: 'medium',
    enabled: true,
    schedule: '0 9 * * *'
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'info';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const handleCreateRule = () => {
    setEditingRule(null);
    setNewRule({
      name: '',
      description: '',
      sqlQuery: '',
      threshold: 0,
      severity: 'medium',
      enabled: true,
      schedule: '0 9 * * *'
    });
    setOpenDialog(true);
  };

  const handleEditRule = (rule: CustomRule) => {
    setEditingRule(rule);
    setNewRule(rule);
    setOpenDialog(true);
  };

  const handleSaveRule = () => {
    if (editingRule) {
      // Update existing rule
      setRules(rules.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, ...newRule, lastRun: new Date() }
          : rule
      ));
    } else {
      // Create new rule
      const rule: CustomRule = {
        ...newRule as CustomRule,
        id: Date.now().toString(),
        createdBy: 'current.user@company.com',
        createdAt: new Date(),
        lastRun: new Date()
      };
      setRules([...rules, rule]);
    }
    setOpenDialog(false);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const toggleRuleStatus = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, enabled: !rule.enabled }
        : rule
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Custom Rules
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Create and manage custom data quality rules with SQL-based validation
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateRule}
        >
          Create Rule
        </Button>
      </Box>

      {/* Alert for custom rules */}
      <Alert severity="info" sx={{ mb: 3 }}>
        Custom rules allow you to define SQL-based data quality checks beyond the standard Snowflake DMFs. 
        These rules can be scheduled to run automatically and will alert you when thresholds are exceeded.
      </Alert>

      {/* Rules Grid */}
      <Grid container spacing={3}>
        {rules.map((rule) => (
          <Grid item xs={12} md={6} lg={4} key={rule.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h3">
                    {rule.name}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={rule.enabled}
                        onChange={() => toggleRuleStatus(rule.id)}
                        size="small"
                      />
                    }
                    label=""
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {rule.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={rule.severity.toUpperCase()}
                    color={getSeverityColor(rule.severity)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    label={rule.enabled ? 'ACTIVE' : 'DISABLED'}
                    color={rule.enabled ? 'success' : 'default'}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Code sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Threshold: {rule.threshold}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Schedule sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Schedule: {rule.schedule}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  Last run: {rule.lastRun?.toLocaleString()}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Created by: {rule.createdBy}
                </Typography>
              </CardContent>
              
              <CardActions>
                <IconButton 
                  size="small" 
                  color="primary"
                  onClick={() => handleEditRule(rule)}
                >
                  <Edit />
                </IconButton>
                <IconButton 
                  size="small" 
                  color="success"
                  disabled={!rule.enabled}
                >
                  <PlayArrow />
                </IconButton>
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={() => handleDeleteRule(rule.id)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Rule Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRule ? 'Edit Custom Rule' : 'Create Custom Rule'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rule Name"
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={newRule.description}
                onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="SQL Query"
                multiline
                rows={6}
                value={newRule.sqlQuery}
                onChange={(e) => setNewRule({ ...newRule, sqlQuery: e.target.value })}
                placeholder="SELECT COUNT(*) as issue_count FROM your_table WHERE condition..."
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Threshold"
                type="number"
                value={newRule.threshold}
                onChange={(e) => setNewRule({ ...newRule, threshold: Number(e.target.value) })}
              />
            </Grid>
            
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Severity</InputLabel>
                <Select
                  value={newRule.severity}
                  label="Severity"
                  onChange={(e) => setNewRule({ ...newRule, severity: e.target.value as any })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Schedule (Cron Expression)"
                value={newRule.schedule}
                onChange={(e) => setNewRule({ ...newRule, schedule: e.target.value })}
                placeholder="0 9 * * * (Daily at 9 AM)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveRule} variant="contained">
            {editingRule ? 'Update' : 'Create'} Rule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomRules;

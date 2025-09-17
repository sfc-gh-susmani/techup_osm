// Snowflake Data Quality Monitoring Types

// DMF Categories from Snowflake documentation
export type DMFCategory = 'Accuracy' | 'Freshness' | 'Statistics' | 'Uniqueness' | 'Volume';

// System DMFs available in Snowflake
export interface SystemDMF {
  name: string;
  category: DMFCategory;
  description: string;
  function: string;
}

// Data Quality Metrics
export interface QualityMetric {
  id: string;
  tableName: string;
  schemaName: string;
  databaseName: string;
  dmf: SystemDMF;
  value: number | string;
  threshold?: number;
  status: 'passed' | 'failed' | 'warning' | 'pending';
  lastUpdated: Date;
  trend?: 'improving' | 'degrading' | 'stable';
}

// Table Quality Overview
export interface TableQuality {
  tableName: string;
  schemaName: string;
  databaseName: string;
  overallScore: number;
  metrics: QualityMetric[];
  lastChecked: Date;
  rowCount?: number;
  issueCount: number;
  status: 'healthy' | 'warning' | 'critical';
}

// Custom Rule Definition
export interface CustomRule {
  id: string;
  name: string;
  description: string;
  sqlQuery: string;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  schedule?: string;
  createdBy: string;
  createdAt: Date;
  lastRun?: Date;
}

// Dashboard Statistics
export interface DashboardStats {
  totalTables: number;
  healthyTables: number;
  tablesWithWarnings: number;
  criticalTables: number;
  totalRules: number;
  activeRules: number;
  lastRefresh: Date;
}

// Chart Data
export interface ChartDataPoint {
  date: string;
  value: number;
  metric: string;
}

// Navigation
export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

// Filter Options
export interface FilterOptions {
  databases: string[];
  schemas: string[];
  tables: string[];
  dmfCategories: DMFCategory[];
  statuses: ('healthy' | 'warning' | 'critical')[];
}

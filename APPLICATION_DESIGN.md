# Snowflake Data Quality Monitor - Application Design

## Overview

A React-based data quality monitoring application designed to work with Snowflake's Data Metric Functions (DMFs) system. Built for the TechUp 2025 Hackathon, this application provides comprehensive data quality monitoring across three architectural layers.

## Architecture

### Three-Layer Design

1. **Table Metrics Layer**
   - Overview of all tables and their quality status
   - Real-time quality scores and health indicators
   - Quick access to table-level issues and trends

2. **Statistics Layer** 
   - Deep statistical analysis using Snowflake DMFs
   - Trend analysis and historical data quality patterns
   - Advanced visualizations with charts and graphs

3. **Custom Rules Layer**
   - User-defined SQL-based quality rules
   - Scheduled automated checks
   - Custom threshold and alerting system

## Snowflake DMF Integration

Based on the [Snowflake DMF Documentation](https://docs.snowflake.com/en/user-guide/data-quality-system-dmfs#system-dmfs), the application supports all system DMFs:

### Accuracy DMFs
- `BLANK_COUNT` - Count of blank values in columns
- `BLANK_PERCENT` - Percentage of blank values
- `NULL_COUNT` - Count of NULL values
- `NULL_PERCENT` - Percentage of NULL values

### Freshness DMFs
- `FRESHNESS` - Data freshness based on timestamp columns
- `DATA_METRIC_SCHEDULE_TIME` - Custom freshness metrics

### Statistics DMFs
- `AVG` - Average values
- `MAX` - Maximum values
- `MIN` - Minimum values
- `STDDEV` - Standard deviation

### Uniqueness DMFs
- `ACCEPTED_VALUES` - Value validation against expressions
- `DUPLICATE_COUNT` - Count of duplicate values
- `UNIQUE_COUNT` - Count of unique values

### Volume DMFs
- `ROW_COUNT` - Record counts

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Charts**: Recharts
- **State Management**: React Hooks (useState, useEffect)
- **Data Fetching**: Axios + TanStack Query (planned)
- **Build Tool**: Create React App

## File Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   ├── Overview.tsx    # Dashboard overview
│   ├── TableMetrics.tsx # Table-level metrics
│   ├── Statistics.tsx  # Statistical analysis
│   └── CustomRules.tsx # Custom rule management
├── types/              # TypeScript type definitions
├── services/           # API and Snowflake integration
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # DMF definitions and constants
└── App.tsx            # Main application component
```

## Features

### Overview Dashboard
- Key metrics and KPIs
- Health status indicators
- Quick access to critical issues
- Real-time status updates

### Table Metrics
- Comprehensive table listing
- DMF-based quality metrics
- Interactive filtering and search
- Drill-down capabilities

### Statistical Analysis
- Advanced charts and visualizations
- Trend analysis over time
- Comparative analytics
- Statistical DMF deep-dives

### Custom Rules
- SQL-based rule creation
- Scheduled execution
- Threshold management
- Alert configuration

## Data Quality Framework

### Quality Scoring
- **Healthy**: 95%+ quality score (green)
- **Warning**: 85-94% quality score (yellow)
- **Critical**: <85% quality score (red)

### Metrics Categories
- **Accuracy**: Data correctness and validity
- **Freshness**: Data timeliness and currency
- **Completeness**: Data coverage and NULL handling
- **Uniqueness**: Duplicate detection and uniqueness
- **Volume**: Data volume and growth patterns

## Future Enhancements

### Snowpark Container Services Integration
- Container-based deployment
- Native Snowflake application
- Direct DMF integration
- Enhanced security and performance

### Advanced Features
- Machine learning-based anomaly detection
- Automated data profiling
- Advanced alerting and notifications
- Role-based access control
- Data lineage integration

## Development Status

✅ **Completed**
- Application structure and design
- Component architecture
- Mock data and UI implementation
- Three-layer navigation
- DMF system integration design

🚧 **In Progress** 
- Snowflake connectivity
- Real data integration
- API service layer

📋 **Planned**
- Authentication system
- Real-time updates
- Advanced analytics
- Deployment configuration

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Target Users

- **Data Engineers**: Monitor and maintain data quality
- **Data Analysts**: Access quality metrics for analysis
- **Business Users**: View high-level quality status
- **Data Stewards**: Manage quality rules and policies

## Snowflake Account

**Target Account**: `SFSENORTHAMERICA-DEMO_OSM.snowflakecomputing.com`

This application is designed to connect to the specified Snowflake demo account and provide comprehensive data quality monitoring across all databases and schemas.

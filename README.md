# ❄️ Snowflake Data Quality Monitor

> **TechUp 2025 Hackathon Project** - A modern, professional data quality monitoring application for Snowflake

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7-blue.svg)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

![Data Quality Monitor Screenshot](https://via.placeholder.com/800x400/2563eb/ffffff?text=Modern+Data+Quality+Dashboard)

## 🚀 Overview

A sophisticated React-based data quality monitoring application that integrates with Snowflake's Data Metric Functions (DMFs) to provide comprehensive data quality insights across your entire data warehouse.

**Target Snowflake Account:** `SFSENORTHAMERICA-DEMO_OSM.snowflakecomputing.com`

## ✨ Features

### 🏗️ Three-Layer Architecture
- **Table Metrics Layer** - Overview of all tables with health indicators
- **Statistics Layer** - Deep statistical analysis using Snowflake DMFs  
- **Custom Rules Layer** - User-defined SQL-based quality rules

### 📊 Comprehensive Monitoring
- **14 System DMFs** - Complete integration with Snowflake's built-in data quality functions
- **Real-time Dashboards** - Interactive visualizations and trend analysis
- **Custom Alerting** - Configurable thresholds and notifications
- **Professional UI** - Modern, enterprise-grade interface design

### 🎯 Snowflake DMF Categories
- **Accuracy** - `BLANK_COUNT`, `BLANK_PERCENT`, `NULL_COUNT`, `NULL_PERCENT`
- **Freshness** - `FRESHNESS`, `DATA_METRIC_SCHEDULE_TIME`
- **Statistics** - `AVG`, `MAX`, `MIN`, `STDDEV`
- **Uniqueness** - `ACCEPTED_VALUES`, `DUPLICATE_COUNT`, `UNIQUE_COUNT`
- **Volume** - `ROW_COUNT`

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **UI Framework:** Material-UI v7 with custom theming
- **Routing:** React Router v6
- **Charts:** Recharts for data visualization
- **State Management:** React Hooks
- **Build Tool:** Create React App
- **Styling:** Modern CSS-in-JS with emotion

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Access to Snowflake account

### Installation

```bash
# Clone the repository
git clone https://github.com/sfc-gh-susmani/techup_osm.git
cd techup_osm

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run type-check
```

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   ├── ModernOverview.tsx    # Dashboard overview
│   ├── TableMetrics.tsx      # Table-level metrics
│   ├── Statistics.tsx        # Statistical analysis
│   └── CustomRules.tsx       # Custom rule management
├── types/              # TypeScript type definitions
├── constants/          # DMF definitions and constants
├── services/           # API and Snowflake integration (future)
└── utils/              # Utility functions
```

## 🎨 Design Philosophy

Built with modern enterprise applications in mind:

- **Clean & Professional** - Inspired by leading monitoring tools
- **Responsive Design** - Works seamlessly across all device sizes
- **Smooth Animations** - Subtle transitions and micro-interactions
- **Accessible** - WCAG compliant color schemes and navigation
- **Performance** - Optimized rendering and lazy loading

## 📊 Screenshots & Features

### Modern Dashboard
- Real-time quality metrics
- Interactive status indicators
- Trend analysis and charts

### Table Metrics View
- Comprehensive table listing
- DMF-based quality scoring
- Advanced filtering and search

### Statistical Analysis
- Deep dive analytics
- Historical trend tracking
- Comparative visualizations

### Custom Rules Management
- SQL-based rule creation
- Automated scheduling
- Threshold configuration

## 🔗 Snowflake Integration

Built specifically for Snowflake's DMF system as documented in the [official Snowflake documentation](https://docs.snowflake.com/en/user-guide/data-quality-system-dmfs#system-dmfs).

### Supported DMFs
The application supports all 14 system DMFs across 5 categories, enabling comprehensive data quality monitoring without custom implementation.

## 🚀 Future Enhancements

### Phase 2 - Snowpark Container Services
- Deploy as native Snowflake application
- Direct DMF integration
- Enhanced security and performance

### Phase 3 - Advanced Features
- Machine learning-based anomaly detection
- Automated data profiling
- Advanced alerting and notifications
- Role-based access control

## 🏆 TechUp 2025 Hackathon

This project was built for the TechUp 2025 Hackathon, demonstrating:
- Modern React development practices
- Enterprise-grade UI/UX design
- Snowflake platform integration
- Professional software architecture

## 👥 Team

**Team 38** - AMS Expansion Hackathon
- **Developer:** Saad Facchine (@sfc-gh-susmani)
- **Target Account:** SFSENORTHAMERICA-DEMO_OSM

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is a hackathon project, contributions and suggestions are welcome! Please feel free to submit issues or pull requests.

## 📞 Support

For questions or support regarding this application:
- Create an issue in this repository
- Contact: saad.facchine@snowflake.com

---

**Built with ❤️ for TechUp 2025 Hackathon**
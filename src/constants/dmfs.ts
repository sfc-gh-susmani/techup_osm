// Snowflake System DMFs based on documentation
// https://docs.snowflake.com/en/user-guide/data-quality-system-dmfs#system-dmfs

import { SystemDMF } from '../types';

export const SYSTEM_DMFS: SystemDMF[] = [
  // Accuracy DMFs
  {
    name: 'BLANK_COUNT',
    category: 'Accuracy',
    description: 'Determine how many blank values are in a column.',
    function: 'SNOWFLAKE.CORE.BLANK_COUNT'
  },
  {
    name: 'BLANK_PERCENT',
    category: 'Accuracy',
    description: 'Determine what percentage of a column\'s values are blank.',
    function: 'SNOWFLAKE.CORE.BLANK_PERCENT'
  },
  {
    name: 'NULL_COUNT',
    category: 'Accuracy',
    description: 'Determine how many NULL values are in a column.',
    function: 'SNOWFLAKE.CORE.NULL_COUNT'
  },
  {
    name: 'NULL_PERCENT',
    category: 'Accuracy',
    description: 'Determine what percentage of a column\'s values are NULL.',
    function: 'SNOWFLAKE.CORE.NULL_PERCENT'
  },
  
  // Freshness DMFs
  {
    name: 'FRESHNESS',
    category: 'Freshness',
    description: 'Determine the freshness of a table\'s data based on a timestamp column.',
    function: 'SNOWFLAKE.CORE.FRESHNESS'
  },
  {
    name: 'DATA_METRIC_SCHEDULE_TIME',
    category: 'Freshness',
    description: 'Define custom freshness metrics.',
    function: 'SNOWFLAKE.CORE.DATA_METRIC_SCHEDULE_TIME'
  },
  
  // Statistics DMFs
  {
    name: 'AVG',
    category: 'Statistics',
    description: 'Determine the average value of a column.',
    function: 'SNOWFLAKE.CORE.AVG'
  },
  {
    name: 'MAX',
    category: 'Statistics',
    description: 'Determine the maximum value of a column.',
    function: 'SNOWFLAKE.CORE.MAX'
  },
  {
    name: 'MIN',
    category: 'Statistics',
    description: 'Determine the minimum value of a column.',
    function: 'SNOWFLAKE.CORE.MIN'
  },
  {
    name: 'STDDEV',
    category: 'Statistics',
    description: 'Determine the standard deviation value for a column.',
    function: 'SNOWFLAKE.CORE.STDDEV'
  },
  
  // Uniqueness DMFs
  {
    name: 'ACCEPTED_VALUES',
    category: 'Uniqueness',
    description: 'Determine whether values in a column match a Boolean expression.',
    function: 'SNOWFLAKE.CORE.ACCEPTED_VALUES'
  },
  {
    name: 'DUPLICATE_COUNT',
    category: 'Uniqueness',
    description: 'Determine the number of duplicate values in a column, including NULL values.',
    function: 'SNOWFLAKE.CORE.DUPLICATE_COUNT'
  },
  {
    name: 'UNIQUE_COUNT',
    category: 'Uniqueness',
    description: 'Determine the number of unique, non-NULL values in a column.',
    function: 'SNOWFLAKE.CORE.UNIQUE_COUNT'
  },
  
  // Volume DMFs
  {
    name: 'ROW_COUNT',
    category: 'Volume',
    description: 'Determine how many records are in the table or view.',
    function: 'SNOWFLAKE.CORE.ROW_COUNT'
  }
];

export const DMF_CATEGORIES = [
  'Accuracy',
  'Freshness', 
  'Statistics',
  'Uniqueness',
  'Volume'
] as const;

export const QUALITY_THRESHOLDS = {
  HEALTHY: 0.95,    // 95% and above
  WARNING: 0.85,    // 85-94%
  CRITICAL: 0.85    // Below 85%
};

export const REFRESH_INTERVALS = {
  REAL_TIME: 30000,     // 30 seconds
  FREQUENT: 300000,     // 5 minutes
  STANDARD: 900000,     // 15 minutes
  SLOW: 3600000        // 1 hour
};

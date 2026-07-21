// ===============================
// Report Helper
// Shared Reporting Functions
// ===============================

// Safe Number
const safeNumber = (value = 0) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
};

// Calculate Percentage
const calculatePercentage = (value = 0, total = 0) => {
  value = safeNumber(value);
  total = safeNumber(total);

  if (total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
};

// Calculate Average
const calculateAverage = (values = []) => {
  if (!Array.isArray(values) || values.length === 0) {
    return 0;
  }

  const numbers = values.map(safeNumber);

  return Math.round(
    numbers.reduce((sum, value) => sum + value, 0) / numbers.length
  );
};

// Calculate Sum
const calculateSum = (values = []) => {
  if (!Array.isArray(values) || values.length === 0) {
    return 0;
  }

  return values
    .map(safeNumber)
    .reduce((sum, value) => sum + value, 0);
};

// Calculate Maximum
const calculateMax = (values = []) => {
  if (!Array.isArray(values) || values.length === 0) {
    return 0;
  }

  return Math.max(...values.map(safeNumber));
};

// Calculate Minimum
const calculateMin = (values = []) => {
  if (!Array.isArray(values) || values.length === 0) {
    return 0;
  }

  return Math.min(...values.map(safeNumber));
};

// Calculate Growth Rate
const calculateGrowthRate = (previous = 0, current = 0) => {
  previous = safeNumber(previous);
  current = safeNumber(current);

  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return Math.round(((current - previous) / previous) * 100);
};

// Format Trend
const formatTrend = (previous = 0, current = 0) => {
  previous = safeNumber(previous);
  current = safeNumber(current);

  if (current > previous) {
    return "UP";
  }

  if (current < previous) {
    return "DOWN";
  }

  return "STABLE";
};

// Generate Summary (Generic)
const generateSummary = (summary = {}) => {
  const total = safeNumber(summary.total);

  const rates = {};

  Object.entries(summary).forEach(([key, value]) => {
    if (key === "total") return;

    rates[key] = calculatePercentage(value, total);
  });

  return {
    ...summary,
    rates,
  };
};

// Build Report
const buildReport = ({
  type = "GENERAL",
  title = "",
  description = "",
  generatedBy = null,
  summary = {},
  statistics = {},
  recommendations = [],
  metadata = {},
} = {}) => {
  return {
    type,
    title,
    description,

    generatedAt: new Date(),
    generatedBy,

    summary,
    statistics,
    recommendations,
    metadata,
  };
};

module.exports = {
  safeNumber,

  calculatePercentage,
  calculateAverage,
  calculateSum,
  calculateMin,
  calculateMax,
  calculateGrowthRate,

  formatTrend,

  generateSummary,

  buildReport,
};
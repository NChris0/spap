const REGEX = {
  // ======================
  // EMAIL
  // ======================
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // ======================
  // PHONE NUMBER
  // International format (E.164)
  // Example: +250788123456
  // ======================
  PHONE_PATTERN: /^\+[1-9]\d{7,14}$/,

  // ======================
  // MONGODB OBJECT ID
  // ======================
  OBJECT_ID_PATTERN: /^[0-9a-fA-F]{24}$/,
};

module.exports = REGEX;
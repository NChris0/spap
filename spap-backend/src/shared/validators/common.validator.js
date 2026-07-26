// =======================================
// Common Validator
// Shared Validation Functions
// =======================================

// Check Required Value
const isRequired = (value) => {
  return value !== undefined && value !== null;
};

// Check String
const isString = (value) => {
  return typeof value === "string";
};

// Check Non-Empty String
const isNonEmptyString = (value) => {
  return isString(value) && value.trim().length > 0;
};

// Check Number
const isNumber = (value) => {
  return typeof value === "number" && Number.isFinite(value);
};

// Check Positive Number
const isPositiveNumber = (value) => {
  return isNumber(value) && value > 0;
};

// Check Non-Negative Number
const isNonNegativeNumber = (value) => {
  return isNumber(value) && value >= 0;
};

// Check Boolean
const isBoolean = (value) => {
  return typeof value === "boolean";
};

// Check Array
const isArray = (value) => {
  return Array.isArray(value);
};

// Check Non-Empty Array
const isNonEmptyArray = (value) => {
  return isArray(value) && value.length > 0;
};

// Check Object
const isObject = (value) => {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
};

// Check Email
const isEmail = (email) => {
  if (!isNonEmptyString(email)) return false;

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email.trim());
};

// Check Phone Number
const isPhone = (phone) => {
  if (!isNonEmptyString(phone)) return false;

  const phoneRegex =
    /^\+?[1-9]\d{7,14}$/;

  return phoneRegex.test(phone.trim());
};

// Check Strong Password
const isStrongPassword = (password) => {
  if (!isNonEmptyString(password)) return false;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  return passwordRegex.test(password);
};

// Check Mongo ObjectId
const isObjectId = (id) => {
  if (!isNonEmptyString(id)) return false;

  return /^[a-fA-F0-9]{24}$/.test(id);
};

// Check UUID v4
const isUUID = (id) => {
  if (!isNonEmptyString(id)) return false;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidRegex.test(id);
};

// Check Date
const isValidDate = (date) => {
  const parsedDate = new Date(date);

  return !Number.isNaN(parsedDate.getTime());
};

// Check Future Date
const isFutureDate = (date) => {
  if (!isValidDate(date)) return false;

  return new Date(date) > new Date();
};

// Check Past Date
const isPastDate = (date) => {
  if (!isValidDate(date)) return false;

  return new Date(date) < new Date();
};

// Check URL
const isURL = (url) => {
  if (!isNonEmptyString(url)) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Check Enum Value
const isEnum = (value, values = []) => {
  return Array.isArray(values) && values.includes(value);
};

module.exports = {
  isRequired,
  isString,
  isNonEmptyString,
  isNumber,
  isPositiveNumber,
  isNonNegativeNumber,
  isBoolean,
  isArray,
  isNonEmptyArray,
  isObject,
  isEmail,
  isPhone,
  isStrongPassword,
  isObjectId,
  isUUID,
  isValidDate,
  isFutureDate,
  isPastDate,
  isURL,
  isEnum,
};
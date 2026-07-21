// ===============================
// Common Validator
// Shared Validation Functions
// ===============================


// Check Required Value
const isRequired = (value) => {

  return (
    value !== undefined &&
    value !== null &&
    value !== ""
  );

};




// Check Empty Value
const isEmpty = (value) => {

  if(value === undefined || value === null){
    return true;
  }


  if(typeof value === "string"){
    return value.trim().length === 0;
  }


  if(Array.isArray(value)){
    return value.length === 0;
  }


  if(typeof value === "object"){
    return Object.keys(value).length === 0;
  }


  return false;

};




// Check String
const isString = (value) => {

  return typeof value === "string";

};




// Check Number
const isNumber = (value) => {

  return (
    typeof value === "number" &&
    !Number.isNaN(value)
  );

};




// Check Boolean
const isBoolean = (value) => {

  return typeof value === "boolean";

};




// Check Array
const isArray = (value) => {

  return Array.isArray(value);

};




// Check Object
const isObject = (value) => {

  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );

};




// Check Minimum Length
const hasMinLength = (
  value,
  minLength
)=>{

  if(!isRequired(value)){
    return false;
  }


  return String(value).length >= minLength;

};




// Check Maximum Length
const hasMaxLength = (
  value,
  maxLength
)=>{

  if(!isRequired(value)){
    return false;
  }


  return String(value).length <= maxLength;

};




// Check Number Range
const isInRange = (
  value,
  min,
  max
)=>{

  if(!isNumber(value)){
    return false;
  }


  return (
    value >= min &&
    value <= max
  );

};




// Check Enum Value
const isEnumValue = (
  value,
  allowedValues = []
)=>{

  if(!Array.isArray(allowedValues)){
    return false;
  }


  return allowedValues.includes(value);

};




// Check Exact Type
const isType = (
  value,
  type
)=>{

  return typeof value === type;

};




// Trim String Safely
const trimString = (
  value = ""
)=>{

  if(!isString(value)){
    return value;
  }


  return value.trim();

};




// Export
module.exports = {

  isRequired,
  isEmpty,

  isString,
  isNumber,
  isBoolean,

  isArray,
  isObject,

  hasMinLength,
  hasMaxLength,

  isInRange,

  isEnumValue,

  isType,

  trimString,

};
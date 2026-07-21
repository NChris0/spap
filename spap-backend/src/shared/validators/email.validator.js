// ===============================
// Email Validator
// Shared Email Validation Functions
// ===============================


// Validate Email Format
const isValidEmail = (email = "") => {

  if(typeof email !== "string"){
    return false;
  }


  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  return emailRegex.test(
    email.trim()
  );

};




// Normalize Email
const normalizeEmail = (
  email = ""
)=>{

  if(typeof email !== "string"){
    return "";
  }


  return email
    .trim()
    .toLowerCase();

};




// Check Corporate Email Domain
const isCorporateEmail = (
  email = "",
  allowedDomains = []
)=>{

  if(
    !isValidEmail(email) ||
    !Array.isArray(allowedDomains) ||
    allowedDomains.length === 0
  ){
    return false;
  }


  const domain =
    normalizeEmail(email)
      .split("@")[1];


  return allowedDomains.includes(domain);

};




// Extract Email Domain
const getEmailDomain = (
  email = ""
)=>{

  if(!isValidEmail(email)){
    return null;
  }


  return normalizeEmail(email)
    .split("@")[1];

};




// Check Same Email
const compareEmails = (
  firstEmail = "",
  secondEmail = ""
)=>{

  return (
    normalizeEmail(firstEmail) ===
    normalizeEmail(secondEmail)
  );

};




// Export
module.exports = {

  isValidEmail,

  normalizeEmail,

  isCorporateEmail,

  getEmailDomain,

  compareEmails,

};
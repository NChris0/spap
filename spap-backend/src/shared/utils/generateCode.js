// ===============================
// Generate System Code
// ===============================
const generateCode = (
  prefix,
  number,
  length = 6
) => {


  const formattedNumber =
    String(number)
      .padStart(length, "0");



  return `${prefix}-${formattedNumber}`;

};



module.exports = {
  generateCode
};
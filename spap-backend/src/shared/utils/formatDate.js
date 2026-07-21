const formatDate = (date) => {


  if (!date) {
    return null;
  }


  return new Date(date)
    .toLocaleDateString(
      "en-GB",
      {
        day:"2-digit",
        month:"short",
        year:"numeric"
      }
    );

};





const formatDateTime = (date) => {


  if (!date) {
    return null;
  }


  return new Date(date)
    .toLocaleString(
      "en-GB",
      {
        day:"2-digit",
        month:"short",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit"
      }
    );

};





module.exports = {
  formatDate,
  formatDateTime
};
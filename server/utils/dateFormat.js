// Function to format a date object as a string in a specific format

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  // Exporting the 'formatDate' function to make it accessible to other parts of the application
  module.exports = formatDate;
  
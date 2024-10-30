const mongoose = require("mongoose");

const ConnectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log(`DB connected`);
    })
    .catch((err) => {
      console.log(`Error in database connection:`, err);
    });
};

module.exports = ConnectDB; 

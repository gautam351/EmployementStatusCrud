const mongoose = require("mongoose");

//to provide the connection uri
const DB_URI =
  "mongodb://localhost:27017/task01";
//connect function
const connectDb = () => {
  mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log(`mongo db connected ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};


//exportion so that it can be used in server.js
module.exports = connectDb;

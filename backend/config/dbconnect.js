const mongoose = require("mongoose");

//to provide the connection uri
const DB_URI =
  "mongodb+srv://gautampraveen351:eGc27Q8qSGmTVrDI@cluster0.obsfe.mongodb.net/employee?retryWrites=true&w=majority";
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

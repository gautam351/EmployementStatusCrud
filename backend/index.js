const express = require("express");
const app = require("./app");
const connectDb = require("./config/dbconnect");

connectDb();
const PORT = 4000;

app.listen(PORT, () => {
  console.log("running on port " + PORT);
});

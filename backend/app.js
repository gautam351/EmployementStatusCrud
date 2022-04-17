const express = require("express");
const app = express();
app.use(express.json());

const EmployeeRoutes = require("./routes/EmployeeRoutes");
app.use("/api/v1", EmployeeRoutes);

module.exports = app;

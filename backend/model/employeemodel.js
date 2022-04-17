const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");

// creating employee schema

const employee = new mongoose.Schema({
  EmployeeId: {
    type: String,
    required: true,
    trim: [true, "please enter employee id"],
  },
  EmployeeName: {
    type: String,
    required: true,
    trim: [true, "please enter employee name"],
  },
  Active: {
    type: Boolean,
    default: true,
  },
  Login: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// hashing the password before saving to db
employee.pre("save", async function (next) {
  // in cases of profile update is password is not change then dont hash it
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bycrpt.hash(this.password, 10);
});

// password comparision
employee.methods.checkPass = async function (enteredpass) {
  return await bycrpt.compare(enteredpass, this.password);
};

module.exports = mongoose.model("employee", employee);

const { Router } = require("express");
const express = require("express");
const { routes } = require("../app.js");
const {
  registerEmployee,
  test,
  loginEmployee,
  changeActive,
  listAllEmployees,
  deleteEmploye,
  getParticular,
  setloginfalse,
} = require("../controllers/employeeController.js");

const router = express.Router();

router.route("/register").post(registerEmployee);
router.route("/login").post(loginEmployee);
router.route("/changeActive/:id/edit").put(changeActive);
router.route("/listAll").get(listAllEmployees);
router.route("/delete/:id").delete(deleteEmploye);
router.route("/show/:id").get(getParticular);
router.route("/setlogin/:id").post(setloginfalse);
module.exports = router;

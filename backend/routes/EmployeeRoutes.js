const { Router } = require("express");
const express = require("express");
const employee= require("../model/employeemodel")

const router =express.Router();;

router.post("/register",async (req,res)=>{


  const { EmployeeId, EmployeeName, password, login } = req.body;

  // checking whtere the user is already registered with the given id or not
  const data = await employee.find({ EmployeeId: EmployeeId });
  if (data.length > 0) {
    return res.status(201).json({
      success: false,
      error: "user already registered with this id",
    });
  }

  // if the id is unique create new user
  const Employee = await employee.create({
    EmployeeId,
    EmployeeName,
    login,
    password,
  });
return   res.status(201).json({
    success: true,
    Employee,
  });
})



router.post("/login",async(req,res,next)=>{
 
  const { EmployeeId, password } = req.body;
  if (!EmployeeId || !password) {
    return res.status(501).json({
      success: false,
      error: "enter email or password",
    });
  }
  const user = await employee
    .findOne({ EmployeeId: EmployeeId })
    .select("+password");
  const check = await user?.checkPass(password);
  if (!check) {
    return res.status(201).json({
      success: true,
      error: "recheck ur email and password",
    });
  }
  await employee.findOneAndUpdate(
    { EmployeeId: EmployeeId },
    { $set: { Login: true } },
    { upsert: true }
  );
  return res.status(200).json({
    success: true,
    login: true,
    user,
  });
});

router.put("/changeActive/:id/edit", async(req,res)=>{
  const Employee = await employee.findById(req.params.id);

  if (!Employee) {
    return res.status(500).json({
      success: false,
      message: "ID not found",
    });
  }

  let { Active, EmployeeId } = await employee.findById(req.params.id);
  if (Active) Active = false;
  else Active = true;
  const data = await employee.findOneAndUpdate(
    { EmployeeId: EmployeeId },
    { $set: { Active: Active } },
    { upsert: true }
  );
  res.status(200).json({
    success: true,
    data,
  });
})

router.get("/listAll",async(req,res)=>{

  const Employee = await employee.find();
  res.status(200).json({
    success: true,
    Employee,
  });


});



router.delete("/delete/:id",async(req,res)=>{
  let Employee = await employee.findById(req.params.id);
  if (!Employee) {
    return res.status(500).json({
      success: false,
      message: "ID not found",
    });
  }
  await Employee.remove();
  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});
router.get("/show/:id",async(req,res)=>{
  const Employee = await employee.find({ EmployeeId: req.params.id });
  if(!Employee){
  return   res.status(200).json({
      success:false,
      msg:"not found",
    })
  }
  res.status(200).json({
    success: true,
    Employee,
  });
});
router.post("/setlogin/:id",async(req,res)=>{
  const data = await employee.findOneAndUpdate(
    { EmployeeId: req.params.id },
    { $set: { Login: false } },
    { upsert: true }
  );
  res.status(201).json({
    success: true,
    data,
  });
});
module.exports = router;

const express = require("express"),
  router = express.Router(),
  { Employee, empValidate, empPutValid } = require("../model/emp"),
  auth = require("../middleware/auth"),
  admin = require("../middleware/admin");

// fetch all elements database
router.get("/", async (req, res) => {
  const emps = await Employee.find().sort("name");
  res.send(emps);
});

router.get("/pages", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const emps = await Employee.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  res.send(emps);
});

// searching by id
router.get("/:id", async (req, res) => {
  const findEmp = await Employee.findById(req.params.id);
  if (findEmp) {
    res.send(findEmp);
  } else {
    res.status(404).send("Employee Not Found!!");
  }
});

router.use(express.json());
// add employee
router.post("/", async (req, res) => {
  const { error } = empValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const newEmp = new Employee({
    fname: req.body.fname,
    salary: req.body.salary,
  });
  const emp = await newEmp.save();
  res.send(emp);
  console.log(emp);
});

// update employee
router.put("/:id", async (req, res) => {
  const { error } = empPutValid(req.body);
  if (error) {
    res.send(error.details[0].message);
  }
  const emp = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      fname: req.body.fname,
    },
    { new: true },
  );
  if (!emp) {
    res.status(404).send("invalid id");
  }
  res.send(emp);
});

// delete employee
router.delete("/:id", [auth, admin], async (req, res) => {
  const findEmp = await Employee.findByIdAndRemove(req.params.id);
  if (findEmp) {
    res.send(findEmp); // view data
  } else {
    res.status(404).send("Employee Not Found!!");
  }
});

module.exports = router;

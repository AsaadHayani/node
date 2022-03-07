const Joi = require("joi"),
  express = require("express"),
  router = express.Router();

// as database
const employees = [
  { empId: 1, fname: "Asaad", salary: 2000 },
  { empId: 2, fname: "Ahmed", salary: 3000 },
  { empId: 3, fname: "Amjad", salary: 4000 },
  { empId: 4, fname: "Osama", salary: 1000 },
];

// fetch all elements database (as array)
router.get("/", (req, res) => {
  res.send(employees);
});

// searching by id
router.get("/:id", (req, res) => {
  const findEmp = employees.find((emp) => emp.empId == req.params.id);
  if (findEmp) {
    res.send(findEmp);
  } else if (req.params.id == "all") {
    res.send(employees);
  } else {
    res.send("Employee Not Found!!");
  }
});

router.use(express.json());
// add employee
router.post("/", (req, res) => {
  const { error } = empValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const newEmp = {
    empId: req.body.empId,
    fname: req.body.fname,
    salary: req.body.salary,
  };
  employees.push(newEmp);
  res.send(newEmp);
  console.log(employees);
});

// update employee
router.put("/:id", (req, res) => {
  const findEmp = employees.find((emp) => emp.empId == req.params.id);
  if (findEmp) {
    const { error } = empPutValid(req.body);
    if (error) {
      res.send(error.details[0].message);
    }
    findEmp.fname = req.body.fname;
    res.send(findEmp);
  } else {
    res.send("Employee Not Found!!");
  }
});

// delete employee
router.delete("/:id", (req, res) => {
  const findEmp = employees.find((emp) => emp.empId == req.params.id);
  if (findEmp) {
    const empIndex = employees.indexOf(findEmp); // fetch index number the object in array
    employees.splice(empIndex, 1); // spliceing it
    res.send(findEmp); // view array
  } else {
    res.send("Employee Not Found!!");
  }
});

function empValidate(employee) {
  const schema = Joi.object({
    empId: Joi.number().integer().required(),
    fname: Joi.string().min(3).required(),
    salary: Joi.number().integer().required(),
  });
  return schema.validate(employee);
}

function empPutValid(employee) {
  const schema = Joi.object({
    fname: Joi.string().min(3).required(),
  });
  return schema.validate(employee);
}

module.exports = router;

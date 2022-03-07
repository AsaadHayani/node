const Joi = require("joi"),
  mongoose = require("mongoose");

const Employee = new mongoose.model(
  "Employee",
  new mongoose.Schema({
    fname: { type: String, minlength: 3, maxlength: 20, required: true },
    salary: { type: Number },
  }),
);
function empValidate(employee) {
  const schema = Joi.object({
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

exports.Employee = Employee;
exports.empValidate = empValidate;
exports.empPutValid = empPutValid;

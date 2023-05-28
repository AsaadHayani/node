const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/employees", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.error("Failed! ", error));

const empSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true, trim: true },
  age: { type: Number, min: [15, "too very small"], max: 50 },
  department: {
    type: Array,
    // params = value of department
    validate: {
      validator: function (params) {
        // if params not found is value it = 0 or null
        return params.length > 0;
      },
      message: "you must choose a department", // message error
    },
  },
  job: {
    type: String,
    // security type select job only from inculde this array
    enum: ["IT", "HR", "Sales", "Manegment"],
    required: true,
  },
  date: { type: Date, default: Date.now },
  isApproved: Boolean,
  salary: {
    type: Number,
    required: function () {
      return (this.isApproved = true);
    },
  },
});

const Employees = mongoose.model("Employees", empSchema);

async function createEmp() {
  const asaad = new Employees({
    name: "Ahmed",
    age: 23,
    department: ["Developer"],
    job: "IT",
    isApproved: true,
    salary: 3000,
  });
  try {
    const result = await asaad.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
createEmp();

async function getEmps() {
  const emps = await Employees.find({ name: "Asaad Hayani" }); // All Data
  // $gte => greater than or equal
  // $lte => less than or equal
  // $eq => equal
  // $in[] => include
  // $nin[] => no include
  // .find({ name: "Ahmed", age: { $gte: 25 } }) // All Data By The Name And Age Only
  // .sort({ name: 1 }) // Sorting From A to Z
  // .select({ name: 1, age: 1 }); // Only Names and Ages And 1 = true
  // .limit(3); // Fetch Only 3 Objects
  console.log(emps);
}
// getEmps();

async function updateEmp(id) {
  const emp = await Employees.findById(id);
  if (emp) {
    emp.age = 45;
    const result = await emp.save();
    console.log(result);
  } else {
    console.log("Not Found");
  }
}
// updateEmp("622093a5f0360d508dcb7156"); //wael

async function updateEmp2(id) {
  const emp = await Employees.update(
    { _id: id },
    {
      $set: {
        age: 40,
      },
    },
  );
  if (emp) {
    console.log(emp);
  } else {
    console.log("Not Found");
  }
}
// updateEmp2("622093a5f0360d508dcb7156"); //wael

// async function updateEmp3(id) {
//   const emp = await Employees.findByIdAndUpdate(id, {
//     $set: { name: "Asaad Hayani", age: 22 },
//   });
//   console.log(emp);
// }
// updateEmp3("622093a5f0360d508dcb7156"); //wael

async function deleteEmp(id) {
  // const emp = await Employees.deleteOne({_id:id}); // only one object
  // const emp = await Employees.deleteMany({_id:id}); // many objects
  const emp = await Employees.findByIdAndRemove(id); // deleting it and returning it
  console.log(emp);
}
// deleteEmp("622093a5f0360d508dcb7156"); //wael

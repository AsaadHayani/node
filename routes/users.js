const express = require("express"),
  router = express.Router(),
  lodash = require("lodash"),
  bcrypt = require("bcrypt"),
  { User, userValid } = require("../model/user"),
  auth = require("../middleware/auth");

// router.get("/profile", auth, async (req, res) => {
//   const profile = await User.findById(req.user._id).select("-password");
//   res.send(profile);
// });

router.use(express.json());
// add employee
router.post("/", async (req, res) => {
  const { error } = userValid(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).send("user found in DB");
  }
  // fetch users from db
  user = new User(lodash.pick(req.body, ["fname", "email", "password"]));
  const saltRounds = 10; // Number of cipher characters
  const salt = await bcrypt.genSalt(saltRounds); // Generate cipher characters
  user.password = await bcrypt.hash(user.password, salt); // Add encoding characters to password
  await user.save(); // save in DB
  // res.header("x-auth-token", token).send(user); // view data in DB [_id, fname, email, pass]
  const token = user.genTokens();
  res
    .header("x-auth-token", token)
    .send(lodash.pick(user, ["_id", "fname", "email"]));
});

module.exports = router;

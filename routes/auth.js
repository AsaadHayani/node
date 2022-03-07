const express = require("express"),
  router = express.Router(),
  Joi = require("joi"),
  bcrypt = require("bcrypt"),
  // jwt = require("jsonwebtoken"),
  { User } = require("../model/user"),
  mongoose = require("mongoose");

router.use(express.json());
// add employee
router.post("/", async (req, res) => {
  const { error } = valid(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    // check email
    return res.status(404).send("invalid email or password");
  }
  // Compare the user you entered with the user in DB
  const checkPass = await bcrypt.compare(req.body.password, user.password);
  if (!checkPass) {
    // check pass
    return res.status(404).send("invalid email or password");
  }
  // res.send("ok");
  const token = user.genTokens();
  res.send(token);
});

function valid(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(req);
}

module.exports = router;

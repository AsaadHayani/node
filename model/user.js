const Joi = require("joi"),
  jwt = require("jsonwebtoken"),
  mongoose = require("mongoose");

const usc = new mongoose.Schema({
  fname: { type: String, required: true, minlength: 3, maxlength: 20 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  isAdmin: Boolean,
});

usc.methods.genTokens = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    "privateKey",
  );
  return token;
};

const User = new mongoose.model("User", usc);

function userValid(user) {
  const schema = Joi.object({
    fname: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.userValid = userValid;

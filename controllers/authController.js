const jwt = require('jsonwebtoken');
const CustomAPIError = require("../error/CustomAPIError");
const { asyncWrapper } = require("../middlewares/async");
const { User } = require("../models/User");

const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const isEmailExist = await User.findOne({ email: email });
  if (isEmailExist) {
    throw new CustomAPIError('Email already Exist', 401);
  }

  const isFirstAccount = await User.countDocuments() === 0;
  const role = isFirstAccount ? "admin" : "role";

  const newUser = await User.create({name, email, password, role});

  const tokenUser = {name: newUser.name, email: newUser.email, role: newUser.role};

  const token  = jwt.sign(tokenUser,'mysecret',{expiresIn: "1d"});
  

  res.status(200).json({tokenUser});
});

const login = asyncWrapper(async (req, res) => {
  console.log(req);
  res.send("hello from login controller");
})

const logout = asyncWrapper(async (req, res) => {
  res.send("hello from logout controller");

});

module.exports = { register, login, logout }
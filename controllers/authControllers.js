const { CustomErrorAPI } = require('../errors/CustomErrorAPI');
const { asyncWrapper } = require('../middlewares/async');
const { User } = require('../models/Users');
const { attachCookiesToResponse } = require('../utils/jwt');
const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new CustomErrorAPI("user already exist", 401);
  }

  const isFirstUser = await User.countDocuments({}) === 0;
  const role = isFirstUser ? "admin" : "user";
  const user = await User.create({ name, email, password, role });

  const tokenUser = {name: user.name, email: user.email, role: user.role}
  attachCookiesToResponse(res, tokenUser);
  res.status(200).json(tokenUser);
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password ){
    throw new CustomErrorAPI("Bad request please provide naem and password", 401);
  }

  const user = await User.findOne({ email });

  if(!user){
    throw new CustomErrorAPI("Invalid credentials", 401);
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    throw new CustomErrorAPI("Invalid credentials", 401);
  }
  const tokenUser = {name: user.name, email: user.email, role: user.role}
  attachCookiesToResponse(res, tokenUser);
  res.status(200).json(tokenUser);
});


const logout = asyncWrapper(async (req, res) => {
  res.send("this is logout")
});

module.exports = {
  register,
  login,
  logout
}
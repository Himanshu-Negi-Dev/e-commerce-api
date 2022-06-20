const CustomAPIError = require("../error/CustomAPIError");
const { asyncWrapper } = require("../middlewares/async");

const register = asyncWrapper(async (req, res) => {

  res.send("hello from register");
});

const login = asyncWrapper(async (req, res) => {
  console.log(req);
  res.send("hello from login controller");
})

const logout = asyncWrapper(async (req, res) => {
  res.send("hello from logout controller");

});

module.exports = { register, login, logout }
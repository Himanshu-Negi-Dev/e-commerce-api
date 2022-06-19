const CustomAPIError = require("../error/CustomAPIError")

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  console.log(err);
  return res.status(500).json({ message: "Server Error" })
}

module.exports = { errorHandlerMiddleware }
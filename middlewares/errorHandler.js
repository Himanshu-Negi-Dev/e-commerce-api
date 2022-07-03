const { CustomErrorAPI } = require("../errors/CustomErrorAPI")

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({msg: "server error"});
}

module.exports = { errorHandlerMiddleware }
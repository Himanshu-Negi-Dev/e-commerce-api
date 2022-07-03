const jwt = require('jsonwebtoken');

const createJWT =  (payload) => {
  const token =  jwt.sign(payload, process.env.MY_JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
  return token
}

const isTokenValid = async (token) =>{
  return jwt.verify(token, process.env.MY_JWT_SECRET)
}

const attachCookiesToResponse = (res, tokenUser) => {
  const token =  createJWT(tokenUser);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + oneDay)
  });
}

module.exports = { createJWT, isTokenValid, attachCookiesToResponse }
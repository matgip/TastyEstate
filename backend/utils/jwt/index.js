const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const sign = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

const verify = (token) => {

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return undefined;
  }
};

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies["JWT"];
  if (!token) res.sendStatus(StatusCodes.UNAUTHORIZED);

  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err)
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    next();
  });
};



module.exports = {
  sign,
  verify,
  jwtMiddleware
};

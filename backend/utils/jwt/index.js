const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const sign = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "2h",
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
  try {
    verify(token);
    next();
  } catch (err) {
    res.json(err);
  }
};



module.exports = {
  sign,
  verify,
  jwtMiddleware
};

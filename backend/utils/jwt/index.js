const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = (token) => {
  return jwt.sign(token, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies["AccessToken"];
  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  });
};

module.exports = {
  generateAccessToken,
  verifyToken,
};

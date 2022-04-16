const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const sign = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
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

const verify = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  sign,
  verify,
};

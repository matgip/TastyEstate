require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  redis: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    REDIS_USER: process.env.REDIS_USER,
    REDIS_PW: process.env.REDIS_PW,
  },
};

let { getUser, addUser } = require("./redis/index");

const DAL = {
  getUser,
  addUser,
};

module.exports = DAL;

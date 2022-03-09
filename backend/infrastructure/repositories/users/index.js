let { isEmpty, getUser, addUser } = require("./redis/index");

const DAL = {
  isEmpty,
  getUser,
  addUser,
};

module.exports = DAL;

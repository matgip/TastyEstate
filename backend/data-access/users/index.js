let { getUser, addUser } = require("./redis/index");

let usersDb = {
  getUser,
  addUser,
};

module.exports = usersDb;

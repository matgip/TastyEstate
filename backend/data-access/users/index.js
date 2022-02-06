let { addUser } = require("./redis/index");

let usersDb = {
  addUser,
};

module.exports = usersDb;

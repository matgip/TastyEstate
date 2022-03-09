let { getLikes, addLikes } = require("./redis/index");

const DAL = {
  getLikes,
  addLikes,
};

module.exports = DAL;

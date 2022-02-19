let { getLikes, addLikes } = require("./redis/index");

let likesDb = {
  getLikes,
  addLikes,
};

module.exports = likesDb;

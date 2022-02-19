let { getLikes } = require("./redis/index");

let likesDb = {
  getLikes,
};

module.exports = likesDb;

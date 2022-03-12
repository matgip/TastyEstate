let { isEmpty, getReview, addReview } = require("./redis/index");

const DAL = {
  isEmpty,
  getReview,
  addReview,
};

module.exports = DAL;

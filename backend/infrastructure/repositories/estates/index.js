let { isEmpty, getEstate, addEstate } = require("./redis/index");

const DAL = {
  isEmpty,
  getEstate,
  addEstate,
};

module.exports = DAL;

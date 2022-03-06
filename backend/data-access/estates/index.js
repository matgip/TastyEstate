let { isEmptyReply, getEstate, addEstate } = require("./redis/index");

const DAL = {
  isEmptyReply,
  getEstate,
  addEstate,
};

module.exports = DAL;

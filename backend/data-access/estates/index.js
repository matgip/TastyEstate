let { getEstate, addEstate } = require("./redis/index");

let estatesDb = {
  getEstate,
  addEstate,
};

module.exports = estatesDb;

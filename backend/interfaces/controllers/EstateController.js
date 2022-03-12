const { StatusCodes } = require("http-status-codes");

const DAL = require("../../infrastructure/repositories/estates");

const getEstate = async (req, res) => {
  try {
    const estate = await DAL.getEstate(req.params.id);
    if (DAL.isEmpty(estate) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(estate);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const addEstate = async (req, res) => {
  try {
    await DAL.addEstate(req.body);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  getEstate,
  addEstate,
};

const { StatusCodes } = require("http-status-codes");

const DAL = require("../../infrastructure/repositories/estates");
const { getErrorCode, getReason } = require("../../utils/http");

const getEstate = async (req, res) => {
  try {
    const estate = await DAL.getEstate(req.params.id);
    if (DAL.isEmpty(estate) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(estate);
  } catch (err) {
    const errCode = getErrorCode(err);
    res.status(errCode).send({
      error: getReason(errCode),
    });
  }
};

const addEstate = async (req, res) => {
  try {
    await DAL.addEstate(req.body);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    const errCode = getErrorCode(err);
    res.status(errCode).send({
      error: getReason(errCode),
    });
  }
};

module.exports = {
  getEstate,
  addEstate,
};

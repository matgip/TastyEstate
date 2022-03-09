const { StatusCodes } = require("http-status-codes");

const DAL = require("../../infrastructure/repositories/users");
const { getStatus, getReasonPhrase } = require("../../utils/http");

const getUser = async (req, res) => {
  try {
    const user = await DAL.getUser(req.params.id);
    if (DAL.isEmpty(user) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(user);
  } catch (err) {
    const errCode = getStatus(err);
    res.status(errCode).send({
      error: getReasonPhrase(errCode),
    });
  }
};

const addUser = async (req, res) => {
  try {
    await DAL.addUser(req.body);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    const errCode = getStatus(err);
    res.status(errCode).send({
      error: getReasonPhrase(errCode),
    });
  }
};

module.exports = {
  getUser,
  addUser,
};

const { StatusCodes } = require("http-status-codes");

const DAL = require("../../infrastructure/repositories/users");

const getUser = async (req, res) => {
  try {
    const user = await DAL.getUser(req.params.id);
    if (DAL.isEmpty(user) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const addUser = async (req, res) => {
  try {
    await DAL.addUser(req.body);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  getUser,
  addUser,
};

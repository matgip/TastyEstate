const { StatusCodes } = require("http-status-codes");

const UserRepository = require("../../infrastructure/repositories/users");

const get = async (req, res) => {
  try {
    const user = await UserRepository.get(req.params.id);
    if (UserRepository.isEmpty(user) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const add = async (req, res) => {
  try {
    await UserRepository.persist(req.body);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  get,
  add,
};

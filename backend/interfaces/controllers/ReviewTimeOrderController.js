const { StatusCodes } = require("http-status-codes");

const DAL = require("../../infrastructure/repositories/reviews/time");

const addUser = async (req, res) => {
  try {
    const result = await DAL.addUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    // console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  addUser,
};

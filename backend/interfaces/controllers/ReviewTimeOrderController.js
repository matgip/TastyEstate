const { StatusCodes } = require("http-status-codes");

const ReviewTimeOrderRepository = require("../../infrastructure/repositories/reviews/time");

const get = async (req, res) => {
  try {
    const reviewedUsers = await ReviewTimeOrderRepository.get(req.params.id, req.query);
    res.json(reviewedUsers);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const add = async (req, res) => {
  try {
    await ReviewTimeOrderRepository.persist(req.params.id, req.body);
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

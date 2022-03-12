const { StatusCodes } = require("http-status-codes");

const DAL = require("../../infrastructure/repositories/likes");

const getLikes = async (req, res) => {
  try {
    const likesCnt = await DAL.getLikes(req.params.id);
    res.json(likesCnt);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const addLikes = async (req, res) => {
  try {
    const result = await DAL.addLikes(req.params.id, req.body.user_id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  getLikes,
  addLikes,
};

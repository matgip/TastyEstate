const DAL = require("../../infrastructure/repositories/likes");
const { getErrorCode, getReason } = require("../../utils/http");

const getLikes = async (req, res) => {
  try {
    const likesCnt = await DAL.getLikes(req.params.id);
    res.json(likesCnt);
  } catch (err) {
    const errCode = getErrorCode(err);
    res.status(errCode).send({
      error: getReason(errCode),
    });
  }
};

const addLikes = async (req, res) => {
  try {
    const result = await DAL.addLikes(req.params.id, req.body.user_id);
    res.json(result);
  } catch (err) {
    const errCode = getErrorCode(err);
    res.status(errCode).send({
      error: getReason(errCode),
    });
  }
};

module.exports = {
  getLikes,
  addLikes,
};

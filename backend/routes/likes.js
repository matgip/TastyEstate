const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../data-access/likes");

const getLikes = async (req, res) => {
  try {
    const result = await DAL.getLikes(req.params.id);
    res.json(result);
  } catch (err) {
    res.sendStatus(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const addLikes = async (req, res) => {
  try {
    const result = await DAL.addLikes(req.params.id, req.body.user_id);
    res.json(result);
  } catch (err) {
    res.sendStatus(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

router.get("/:id", getLikes);
router.put("/:id", addLikes);

module.exports = router;

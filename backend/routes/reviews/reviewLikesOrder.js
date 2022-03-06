const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../../data-access/reviews/likes");

const addUser = async (req, res) => {
  try {
    const result = await DAL.addUser(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

router.put("/:id/likes", addUser);

module.exports = router;

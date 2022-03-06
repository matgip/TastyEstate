const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../data-access/estates");

const getEstate = async (req, res) => {
  try {
    const result = await DAL.getEstate(req.params.id);
    if (DAL.isEmptyReply(result) === true) {
      res.sendStatus(httpStatus.StatusCodes.NO_CONTENT);
      return;
    }
    res.json(result);
  } catch (err) {
    res.sendStatus(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const addEstate = async (req, res) => {
  try {
    await DAL.addEstate(req.body);
    res.sendStatus(httpStatus.StatusCodes.OK);
  } catch (err) {
    res.sendStatus(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

router.get("/:id", getEstate);
router.post("/", addEstate);

module.exports = router;

const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");

const DAL = require("../data-access/estates");
const { InvalidInputError } = require("../errors");

const getEstate = async (req, res) => {
  try {
    const estate = await DAL.getEstate(req.params.id);
    if (DAL.isEmpty(estate) === true) {
      res.sendStatus(httpStatus.StatusCodes.NO_CONTENT);
      return;
    }
    res.json(estate);
  } catch (err) {
    console.log(err);
    if (err instanceof InvalidInputError) {
      res.status(httpStatus.StatusCodes.BAD_REQUEST).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.BAD_REQUEST),
      });
    } else {
      res.status(httpStatus.StatusCodes.SERVICE_UNAVAILABLE).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.SERVICE_UNAVAILABLE),
      });
    }
  }
};

const addEstate = async (req, res) => {
  try {
    await DAL.addEstate(req.body);
    res.sendStatus(httpStatus.StatusCodes.OK);
  } catch (err) {
    if (err instanceof InvalidInputError) {
      res.status(httpStatus.StatusCodes.BAD_REQUEST).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.BAD_REQUEST),
      });
    } else {
      res.status(httpStatus.StatusCodes.SERVICE_UNAVAILABLE).send({
        error: httpStatus.getReasonPhrase(httpStatus.StatusCodes.SERVICE_UNAVAILABLE),
      });
    }
  }
};

router.get("/:id", getEstate);
router.post("/", addEstate);

module.exports = router;

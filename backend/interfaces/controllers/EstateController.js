const { StatusCodes } = require("http-status-codes");

const EstateRepository = require("../../infrastructure/repositories/estates");

const get = async (req, res) => {
  try {
    const estate = await EstateRepository.get(req.params.id);
    if (EstateRepository.isEmpty(estate) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(estate);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const add = async (req, res) => {
  try {
    await EstateRepository.persist(req.body);
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

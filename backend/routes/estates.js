const express = require("express");
const router = express.Router();

let estatesDb = require("../data-access/estates");
let estates = (module.exports = {});

estates.getEstate = async (req, res) => {
  try {
    const result = await estatesDb.getEstate(req.params.id);
    if (estatesDb.isEmptyReply(result) == true) {
      res.sendStatus(204);
      return;
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
estates.addEstate = async (req, res) => {
  try {
    const result = await estatesDb.addEstate(req.body);
    res.sendStatus(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

router.get("/:id", estates.getEstate);
router.post("/", estates.addEstate);

module.exports = router;

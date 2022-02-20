const express = require("express");
const router = express.Router();
const httpStatus = require("../http-status");

let likesDb = require("../data-access/likes");
let likes = (module.exports = {});

likes.getLikes = async (req, res) => {
  try {
    const result = await likesDb.getLikes(req.params.id);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(httpStatus.INTERNAL_ERR);
  }
};

likes.addLikes = async (req, res) => {
  try {
    const result = await likesDb.addLikes(req.params.id, req.body.user_id);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(httpStatus.INTERNAL_ERR);
  }
};

router.get("/:id", likes.getLikes);
router.put("/:id", likes.addLikes);

module.exports = router;

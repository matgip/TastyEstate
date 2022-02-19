const express = require("express");
const router = express.Router();

let likesDb = require("../data-access/likes");
let likes = (module.exports = {});

likes.getLikes = async (req, res) => {
  try {
    const result = await likesDb.getLikes(req.params.id);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};

router.get("/:id", likes.getLikes);

module.exports = router;

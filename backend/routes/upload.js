const express = require("express");
const multer = require("multer");

const router = express.Router();

const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "uploads", req.params.id);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "uploads", req.params.id);
    fs.readdir(uploadPath, function (err, files) {
      if (err) throw err;
      const filename = (files.length + 1).toString();
      cb(null, filename);
    });
  },
});
const upload = multer({ storage: storage });

router.post("/:id", upload.single("file"), function (req, res, next) {
  console.log("UPLOAD " + req.file.filename);
  res.json({ my_key: req.file.filename }); // you can send any arbitrary data to client which will be saved in fileRecord.upload key in client, and will be sent back to server at update/delete request
});

router.put("/:id", function (req, res, next) {
  let response = {};
  if (req.body && req.body.my_key && req.body.filename) {
    console.log("UPDATE UPLOAD " + req.body.my_key);
    const uploadPath = path.join(__dirname, "..", "uploads", req.params.id);
    fs.rename(path.join(uploadPath, req.body.my_key), path.join(uploadPath, req.body.filename), (err) => {
      if (err) throw err;
      console.log("Rename complete!", req.body.my_key, req.body.filename);
      response.my_key = req.body.filename;
      console.log("Rename complete!", response);
      res.json(response);
    });
  }
});

router.delete("/:id", function (req, res, next) {
  let response = {};
  if (req.body && req.body.my_key) {
    console.log("DELETE UPLOAD " + req.body.my_key);
    const uploadPath = path.join(__dirname, "..", "uploads", req.params.id);
    fs.unlink(path.join(uploadPath, req.body.my_key), (err) => {
      if (err) throw err;
      console.log(req.body.my_key + " was deleted");
      response.deleted = true;
      res.json(response);
    });
  }
});

module.exports = router;

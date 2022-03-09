const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const rootPath = path.join(__dirname, "../../", "uploads");

const setUpPath = (estateID, cb) => {
  const imgPath = path.join(rootPath, estateID);
  if (!fs.existsSync(imgPath)) {
    fs.mkdirSync(imgPath);
  }
  cb(null, imgPath);
};

const readImg = (estateID, cb) => {
  const imgPath = path.join(rootPath, estateID);
  fs.readdir(imgPath, (err, files) => {
    if (err) throw err;

    const filename = (files.length + 1).toString();
    cb(null, filename);
  });
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      setUpPath(req.params.id, cb);
    },
    filename(req, file, cb) {
      readImg(req.params.id, cb);
    },
  }),
});

const getImage = (req, res) => {
  if (!req.params || !req.params.id) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  if (!req.query || !req.query.image) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  const estateID = req.params.id;
  const imgID = req.query.image;

  const img = path.join(rootPath, estateID, imgID);
  fs.access(img, fs.F_OK, (err) => {
    if (err) {
      const defaultImg = path.join(rootPath, "default.png");
      res.sendFile(defaultImg);
    } else {
      res.sendFile(img);
    }
  });
};

const addImage = (req, res) => {
  const fileName = req.file.filename;
  res.json({ my_key: fileName });
};

const updateImage = (req, res) => {
  if (!req.params || !req.params.id) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  if (!req.body || !req.body.my_key || !req.body.filename) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  const estateID = req.params.id;
  const originName = req.body.my_key;
  const newName = req.body.filename;

  const imgPath = path.join(rootPath, estateID);
  fs.rename(path.join(imgPath, originName), path.join(imgPath, newName), (err) => {
    if (err) throw err;
    let resp = {};
    resp.my_key = newName;
    res.json(resp);
  });
};

const removeImage = (req, res) => {
  if (!req.params || !req.params.id) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  if (!req.body || !req.body.my_key) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  const estateID = req.params.id;
  const fileName = req.body.my_key;

  const imgPath = path.join(rootPath, estateID);
  fs.unlink(path.join(imgPath, fileName), (err) => {
    if (err) throw err;
    let resp = {};
    resp.deleted = true;
    res.json(resp);
  });
};

module.exports = {
  upload,
  setUpPath,
  readImg,
  getImage,
  addImage,
  updateImage,
  removeImage,
};

const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const rootPath = path.join(__dirname, "../../", "upload_imgs");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    setDir(req.params.id, cb);
  },
  filename(req, file, cb) {
    setFilename(req.params.id, cb);
  },
});
const upload = multer({ storage: storage });

function setDir(estateId, cb) {
  const ep = path.join(rootPath, estateId);
  if (!fs.existsSync(ep)) {
    fs.mkdirSync(ep);
  }
  cb(null, ep);
}

function setFilename(estateId, cb) {
  const ep = path.join(rootPath, estateId);
  fs.readdir(ep, (err, files) => {
    if (err) throw err;
    const fname = (files.length + 1).toString();
    cb(null, fname);
  });
}

function sendResponse(req, res) {
  res.json({ my_key: req.file.filename });
}

async function get(req, res) {
  try {
    const {
      params: { id: estateId },
      query: { image: imgId },
    } = req;
    await fs.promises.access(path.join(rootPath, estateId, imgId), fs.F_OK);
    res.sendFile(path.join(path.join(rootPath, estateId, imgId)));
  } catch (err) {
    console.log(err);
    res.sendFile(path.join(rootPath, "default.png"));
  }
}

async function update(req, res) {
  try {
    const {
      params: { id: estateId },
      body: { my_key: originFilename, fileName: newFilename },
    } = req;
    await fs.promises.rename(path.join(rootPath, estateId, originFilename), path.join(rootPath, estateId, newFilename));
    res.json({ my_key: newFilename });
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function remove(req, res) {
  try {
    const {
      params: { id: estateId },
      body: { my_key: fileName },
    } = req;
    await fs.promises.unlink(path.join(rootPath, estateId, fileName));
    res.json({ deleted: true });
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  upload,
  setDir,
  setFilename,
  get,
  sendResponse,
  update,
  remove,
};

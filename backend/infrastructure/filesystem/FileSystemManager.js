const fs = require("fs");
const path = require("path");
const multer = require("multer");

module.exports = class FileSystemManager {
  rootPath;
  middleWare;

  constructor(rootUploadFilePath) {
    this.rootPath = rootUploadFilePath;

    const storage = multer.diskStorage({
      destination(req, file, cb) {
        this.setDir(req.params.id, cb);
      },
      filename(req, file, cb) {
        this.setFilename(req.params.id, cb);
      },
    });
    this.middleWare = multer({ storage: storage });
  }

  setDir(estateId, cb) {
    const dir = this.getDirPath(estateId);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  }

  setFilename(estateId, cb) {
    fs.readdir(this.getDirPath(estateId), (err, files) => {
      if (err) throw err;
      const fname = (files.length + 1).toString();
      cb(null, fname);
    });
  }

  async get(estateId, filename) {
    await fs.promises.access(this.getFilePath(estateId, filename)), fs.F_OK);
  }

  async update(estateId, originFilename, newFilename) {
    await fs.promises.rename(
      this.getFilePath(estateId, originFilename),
      this.getFilePath(estateId, newFilename)
    );
  }

  async remove(estateId, filename) {
    await fs.promises.unlink(this.getFilePath(estateId, filename));
  }

  getDirPath(estateId) {
    return path.join(this.rootPath, estateId);
  }

  getFilePath(estateId, filename) {
    return path.join(this.getDirPath(estateId), filename);
  }

  getMiddleWare() {
    return this.middleWare;
  }
};

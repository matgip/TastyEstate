const fs = require("fs");
const path = require("path");
const multer = require("multer");

module.exports = class FileSystemManager {
  rootUploadFilePath = path.join(__dirname, "../../upload_imgs");
  middleWare;

  constructor() {
    const self = this;
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        self.setDir(req.params.id, cb);
      },
      filename(req, file, cb) {
        self.setFilename(req.params.id, cb);
      },
    });
    this.middleWare = multer({ storage: storage });
  }

  setDir(dirname, cb) {
    const dir = this.getDirPath(dirname);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  }

  setFilename(dirname, cb) {
    fs.readdir(this.getDirPath(dirname), (err, files) => {
      if (err) throw err;
      const fname = (files.length + 1).toString();
      cb(null, fname);
    });
  }

  async get(dirname, fname) {
    await fs.promises.access(this.getFilePath(dirname, fname), fs.F_OK);
  }

  async update(dirname, oFile, nFile) {
    await fs.promises.rename(this.getFilePath(dirname, oFile), this.getFilePath(dirname, nFile));
  }

  async remove(dirname, fname) {
    await fs.promises.unlink(this.getFilePath(dirname, fname));
  }

  getDirPath(dirname) {
    return path.join(this.rootUploadFilePath, dirname);
  }

  getFilePath(dirname, fname) {
    return path.join(this.rootUploadFilePath, dirname, fname);
  }

  getDefaultFilePath() {
    return path.join(this.rootUploadFilePath, "default.png");
  }

  getMiddleWare() {
    return this.middleWare;
  }
};

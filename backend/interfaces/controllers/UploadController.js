const { StatusCodes } = require("http-status-codes");

const FileSystemManager = require("../../infrastructure/filesystem/FileSystemManager");
const fileSystemManager = new FileSystemManager();
const middleWare = fileSystemManager.getMiddleWare();

function sendResponse(req, res) {
  res.json({ my_key: req.file.filename });
}

async function get(req, res) {
  try {
    const {
      params: { id: estateId },
      query: { image: imgId },
    } = req;
    await fileSystemManager.get(estateId, imgId);
    res.sendFile(fileSystemManager.getFilePath(estateId, imgId));
  } catch (err) {
    // console.error(err);
    res.sendFile(fileSystemManager.getDefaultFilePath());
  }
}

async function update(req, res) {
  try {
    const {
      params: { id: estateId },
      body: { my_key: originFilename, fileName: newFilename },
    } = req;
    await fileSystemManager.update(estateId, originFilename, newFilename);
    res.json({ my_key: newFilename });
  } catch (err) {
    // console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function remove(req, res) {
  try {
    const {
      params: { id: estateId },
      body: { my_key: fileName },
    } = req;
    await fileSystemManager.remove(estateId, fileName);
    res.json({ deleted: true });
  } catch (err) {
    // console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  middleWare,
  get,
  sendResponse,
  update,
  remove,
};

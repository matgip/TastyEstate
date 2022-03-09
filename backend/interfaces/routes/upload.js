const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/UploadController");

router.get("/:id", UploadController.getImage);
router.post("/:id", UploadController.upload.single("file"), UploadController.addImage);
router.put("/:id", UploadController.updateImage);
router.delete("/:id", UploadController.removeImage);

module.exports = router;

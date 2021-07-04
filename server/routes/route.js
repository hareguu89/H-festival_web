const express = require("express");
const router = express.Router();
module.exports = router;

const { Dealers, ImageUpload, MediaPost } = require("../controller");

router.post("/imgUpload", ImageUpload.uploadImageToS3);

router.post("/dealers", Dealers.post);
router.get("/dealers", Dealers.get);

router.post("/mediaPost", ImageUpload.uploadImageToS3);



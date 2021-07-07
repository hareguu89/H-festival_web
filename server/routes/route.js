const express = require("express");
const router = express.Router();
module.exports = router;

const { Dealers, ImageUpload, MediaPost } = require("../controller");

router.post("/imgUpload", ImageUpload.uploadImageToS3);
router.post("/mediaPost", ImageUpload.uploadImageToS3);

router.post("/dealers", Dealers.post);
router.post("/dealerMedia", MediaPost.post);

router.get("/test", Dealers.get);

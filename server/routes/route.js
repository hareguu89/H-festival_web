const express = require("express");
const router = express.Router();
module.exports = router;

const { Dealers, ImageUpload, Test } = require("../controller");

router.post("/imgUpload", ImageUpload.uploadImageToS3);

router.post("/dealers", Dealers.post);

router.get("/test", Test.get);

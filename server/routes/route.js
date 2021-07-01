const express = require("express");
const router = express.Router();
module.exports = router;

const { ImageUpload, Test } = require("../controller");

router.post("/dealers", ImageUpload.uploadImageToS3);

router.get("/test", Test.get);

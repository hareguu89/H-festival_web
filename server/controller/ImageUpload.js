const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const s3 = new AWS.S3({
  AWSAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  AWSSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "h-festival/images", // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
}).array("profileImage", 10);

module.exports = {
  uploadImageToS3: (req, res) => {
    upload(req, res, (error) => {
      if (error) {
        res.json({ error: error });
      } else {
        if (req.files === undefined) {
          res.json("Error: No File Selected");
        } else {
          let locations = [];
          let names = [];
          for (let i = 0; i < req.files.length; i++) {
            locations.push(req.files[i].location);
          }
          res.json({
            location: locations,
          });
        }
      }
    });
  },
};

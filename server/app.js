require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const router = require("./routes/route");
const express = require("express");
const app = express();

// Create Table if table is not exist
const models = require("./models/index.js");

models.sequelize
  .sync()
  .then(() => {
    console.log("DB SET DONE");
  })
  .catch((err) => {
    console.log("DB SET FAIL");
    console.log(err);
  });

app.use(
  session({
    key: "sid",
    secret: "pprk",
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "None",
      httpOnly: true,
      secure: true,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
	  origin: ["http://h-festival-client.s3-website.ap-northeast-2.amazonaws.com"],
	  credentials: true,
	  methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(cookieParser());
app.use("/", router);

router.get("/", function (req, res) {
  res.status(200).json("Hello World!");
});

const HTTP_PORT = process.env.HTTP_PORT || 4000;

app.listen(HTTP_PORT, () => {
  console.log("server runnning ", HTTP_PORT);
});

module.exports = app;

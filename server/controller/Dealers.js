const { dealer } = require("../models");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  get: (req, res) => {},
  post: async (req, res) => {
    await dealer
      .create({
        where: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          imgsrc: req.body.imgsrc,
          region: req.body.region,
          country: req.body.country,
          sex: req.body.sex,
          mediaDest: req.body.mediaDest,
          description: req.body.description,
        },
      })
      .then((data) => {
        if (data) {
          res.status(200).json("완료.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

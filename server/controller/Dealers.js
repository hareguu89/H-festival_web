const { dealer } = require("../models");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  get: async (req, res) => {
    await dealer.findAll({}).then(data => {
      res.status(200).json(data);
    })
  },
  post: async (req, res) => {
    await dealer
      .create({
          name: req.body.fullname,
          email: req.body.email,
          mobile: req.body.mobile,
          imgsrc: req.body.picture,
          region: req.body.region,
          country: req.body.country,
          sex: req.body.sex,
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

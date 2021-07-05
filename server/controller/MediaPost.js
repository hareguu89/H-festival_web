const { dealer } = require("../models");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  post: async (req, res) => {
    await dealer
      .update()
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

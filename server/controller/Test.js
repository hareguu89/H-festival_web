const { dealer } = require("../models");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  get: async (req, res) => {
    console.log("대표님 접속욥");

    await dealer.findAll({}).then((data) => {
      if (data) {
        res.status(200).json(data);
      }
    });
  },
};

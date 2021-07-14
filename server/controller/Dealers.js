const { dealer, image, file } = require("../models");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  get: async (req, res) => {
    await dealer.findAll({}).then((data) => {
      res.status(200).json(data);
    });
  },
  post: async (req, res) => {
    let user = await dealer.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      email: req.body.email,
      region: req.body.region,
      country: req.body.country,
      sex: req.body.sex,
      selectedDest: req.body.selectedDest,
      description: req.body.description,
    });

    let imgSrc = req.body.picture.src;
    for (let i = 0; i < imgSrc.length; i++) {
      await image.create({
        dealerId: user.dataValues.id,
        image: imgSrc[i],
      });
    }

    let files = req.body.mediaDest.src;
    for (let i = 0; i < files.length; i++) {
      await file.create({
        dealerId: user.dataValues.id,
        file: files[i],
      });
    }

    if (user) {
      res.status(200).json("완료.");
    } else {
      res.status(404).json("error");
    }

    // await dealer
    //   .findOne({ where: { id: user.dataValues.id }, include: [image] })
    //   .then((data) => {
    //     res.status(200).json(data);
    //   });
  },
};

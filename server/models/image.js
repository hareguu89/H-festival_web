"use strict";

const { Model, INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      image.belongsTo(models.dealer, {
        foreignKey: "dealerId",
        targetKey: "id",
      });
    }
  }
  image.init(
    {
      dealerId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "image",
      createdAt: false,
      updatedAt: false,
    }
  );

  return image;
};

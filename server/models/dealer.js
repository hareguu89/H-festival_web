"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class dealer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  dealer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(30),
      email: DataTypes.STRING(50),
      mobile: DataTypes.STRING(30),
      imgsrc: DataTypes.STRING,
      region: DataTypes.STRING(30),
      country: DataTypes.STRING(30),
      sex: DataTypes.BOOLEAN,
      mediaDest: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "dealer",
      createdAt: false,
      updatedAt: false,
    }
  );

  return dealer;
};

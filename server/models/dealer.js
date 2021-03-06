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
      dealer.hasMany(models.image, { foreignKey: "dealerId", sourceKey: "id" });
    }
  }

  dealer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING(30),
      lastName: DataTypes.STRING(30),
      email: DataTypes.STRING(50),
      mobile: DataTypes.STRING,
      region: DataTypes.STRING(60),
      country: DataTypes.STRING(60),
      sex: DataTypes.STRING(30),
      mediaDest: DataTypes.STRING,
      selectedDest: DataTypes.STRING,
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

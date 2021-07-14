"use strict";

const { Model, INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      file.belongsTo(models.dealer, {
        foreignKey: "dealerId",
        targetKey: "id",
      });
    }
  }
  file.init(
    {
      dealerId: DataTypes.INTEGER,
      file: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "file",
      createdAt: false,
      updatedAt: false,
    }
  );

  return file;
};

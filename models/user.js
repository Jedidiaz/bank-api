const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");
const Movement = require("./movement");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    },
  },
  { timestamps: true }
);

module.exports = User;

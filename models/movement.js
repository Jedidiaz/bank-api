const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Movement = sequelize.define(
  "movements",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user_send: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_user_recive: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timeStamp: true }
);

module.exports = Movement;

const { Sequelize } = require("sequelize");
const { config } = require("dotenv");
config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
    max: 20,
    min: 0,
    acquire: 60000,
    idle: 20000,
  },
  }
);

const connect = async () => {
  try {
    await sequelize.sync();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connect, sequelize };

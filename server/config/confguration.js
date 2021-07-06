const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "junghwan",
    password: process.env.DATABASE_PASSWORD,
    database: "hyundai",
    host: process.env.DATABASE_PATH,
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "junghwan",
    password: process.env.DATABASE_PASSWORD,
    database: "hyundai",
    host: process.env.DATABASE_PATH,
    dialect: "mysql",
  },
  production: {
    username: "junghwan",
    password: process.env.DATABASE_PASSWORD,
    database: "hyundai",
    host: process.env.DATABASE_PATH,
    dialect: "mysql",
  },
};

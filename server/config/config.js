/*
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "hyundai",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "hyundai",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "hyundai",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
*/

 const dotenv = require('dotenv');
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

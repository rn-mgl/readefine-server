const mysql = require("mysql2");

const connection = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  multipleStatements: false,
});
module.exports = connection.promise();

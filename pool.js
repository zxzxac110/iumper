

const mysql = require('mysql');
var pool = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "iumper",
  connectionLimit: 30
});
module.exports = pool//导出连接池



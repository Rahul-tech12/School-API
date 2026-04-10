const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mainline.proxy.rlwy.net",
  user: "root",
  password: "AIsDSUJiNtCTjoumSUopryDRkOBpJlXM",
  database: "railway",
  port: 30103
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;

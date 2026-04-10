const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mysql://root:AIsDSUJiNtCTjoumSUopryDRkOBpJlXM@mainline.proxy.rlwy.net:30103/railway",
  user: "root",
  password: "root",
  database: "school_db",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;

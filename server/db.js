import mysql from "mysql2";
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "01042001",
  database: "blog_db",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected! to database");
});

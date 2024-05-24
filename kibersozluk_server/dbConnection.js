const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "kibersozluk",
});

dbConnection.connect(function (err) {
  if (err) throw Error("[!] Maglumat bazasyna birikme yok!");
  console.log("[+] Maglumat bazasyna birikdirildi!");
});

module.exports = dbConnection;

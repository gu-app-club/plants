//https://github.com/sidorares/node-mysql2
const mysql = require("mysql2/promise");

async function SQLConnect(testing) {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "plants_dev"
  });
}

async function showTables(connection) {
  const [results, fields] = await connection.query("show tables");
  return results;
}

async function database(request, response) {
  let connection = await SQLConnect();
  let tables = await showTables(connection);
  response.send(tables);
}

module.exports = database;

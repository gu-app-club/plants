//https://github.com/sidorares/node-mysql2
const mysql = require("mysql2/promise");

async function SQLConnect(testing) {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "plants_dev"
  });
}

//displays all of the tables
async function showTables(connection) {
  const [results, fields] = await connection.query("show tables");
  return results;
}

//grabs all of the users
async function getUsers(connection){
	const [results,fields] = await connection.query("SELECT userID FROM Users");
	return results;
}

//Runs the database functions
async function database(request, response) {
  let connection = await SQLConnect();
  //let tables = await showTables(connection);
  let users = await  getUsers(connection);
  response.send(users)
  response.send(tables);
}

module.exports = database;

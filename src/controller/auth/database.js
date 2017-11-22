//https://github.com/sidorares/node-mysql2
const mysql = require("mysql2/promise");

async function SQLConnect(testing) {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "plants_dev"
  });
}

//generates a sudo random number
function generateID(){
	return Math.random().toString(36).substr(2,15);
}

//displays all of the tables
async function showTables(connection) {
  const [results, fields] = await connection.query("show tables");
  return results;
}

//grabs all of the users
async function getUsers(connection){
	const [results,fields] = await connection.query("SELECT * FROM Users");
	return results;
}

//grabs all of the plants
async function getPlants(connection){
	const [results] = await connection.query("SELECT * FROM Plant");
	return results;
}
	
	
//if the location does not exist, then insert the location into the location tables
//param: building-- the building in which the plant is in
//param: areas -- the room, hallway or anything else to further describe the plant
async function addLocation(connection,building, areas){
	building = building.toLowerCase(); //makes it so that the location table isn't scattered
	areas = areas.toLowerCase();
	//prepared statement
	const [results,fields] = await connection.query('SELECT locationID FROM Location WHERE building = ?  AND area = ?;',[building,areas]);

	if(Object.keys(results).length == 0){ // checks for the location being in the database
		 await connection.query("INSERT INTO Location(Building,Area) VALUES(?,?);",[building,areas]);
	}

	const [result] = await connection.query("SELECT locationID FROM Location WHERE building = ?  AND area = ?",[building,areas]);
	//const [result] = await connection.query("Select * from Location");
	return result;
}

//adds a plant into the database.
//param: building, areas--the location of the plant
//param: name-- the name given to the plant
//param: frequency-- the amount per mouth it needs to be watered
//param: statusType-- Whether the plant is 'Alive', 'Dead' or 'Gone'
async function addPlant(connection,building,areas,name,frequency,statusType){
	let id = await addLocation(connection,building,areas);
	var locationID = id[0];
	const[result] = await connection.query("INSERT INTO Plant(locationID,plantName,waterFrequency,status) VALUES(?,?,?,?);",[locationID,name,frequency, statusType]);
	
	return id;
}

//Checks to see if the username is in use already
//param: user-- the username being checked
//returns: true if the username exists, false otherwise
async function isUsername(connection,user){
	const[key] = await connection.query("SELECT userID FROM Users WHERE userID = ?",[newID]);
	if(Object.keys(key).length == 0){
		return false;
	}
	return true;

}

//Adds the user to the database
//param: connection--how connection to the database
//param: username-- the unique ID of the user
//param: name -- the actual name of the user
//param: phoneNumber-- the phone number of the user
//param: role-- the type of the user
async function addUser(connection,username,name,phoneNumber, role){
	var newID = "v7t8n781i9cyrs2";

	const[result] = await connection.query("INSERT INTO Users(userID, name,phoneNumber,role) VALUES(?,?,?,?);",[username,name,phoneNumber,role]);
}

//Runs the database functions
async function database(request, response) {
  let connection = await SQLConnect();
  //let tables = await showTables(connection);
  let users = await  getUsers(connection);
  //let plants = await getPlants(connection);
 
  //response.send(plants);
  response.send(users);
  //console.log(generateID());
  user = addUser(connection,"joeyblaze","jacob","360345170","Creator");
  //response.send(user);
}


module.exports = database;

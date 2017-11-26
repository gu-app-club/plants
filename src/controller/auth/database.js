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
	//const [results,fields] = await connection.query("SELECT locationID FROM Location WHERE building = '" + building + "' AND area = '" + areas+ "'");
	//prepared statement
	const [results,fields] = await connection.query('SELECT locationID FROM Location WHERE building = ?  AND area = ?;',[building,areas]);

	if(Object.keys(results).length == 0){ // checks for the location being in the database
		//await connection.query("INSERT INTO Location(Building,Area) VALUES('"+building+"','"+ areas+"');");
		 await connection.query("INSERT INTO Location(Building,Area) VALUES(?,?);",[building,areas]);
	}
	//const [result] = await connection.query("SELECT locationID FROM Location WHERE building = '" + building + "' AND area = '" + areas+ "'");
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
//Runs the database functions
async function database(request, response) {
  let connection = await SQLConnect();
  //let tables = await showTables(connection);
  //let users = await  getUsers(connection);
  let plants = await getPlants(connection);
  response.send(plants);
  //response.send(users);
  //response.send(tables);
  //let location = await addLocation(connection,"herak","Room 321");
  //let plant = await addPlant(connection,"PACCAR","Room 329", "planty!",5, "Alive");
  
  //response.send(plant);
}

module.exports = database;

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
async function getTimes(){
	let connection = await SQLConnect();
	const [results,fields] = await connection.query("SELECT * FROM WaterEvent");
	return results;
}


async function showRelationships(){
	let connection = await SQLConnect();
	const [results,fields] = await connection.query("SELECT * FROM PlantOwnership");
	return results;
}
//displays all of the tables
async function showTables() {
  let connection = await SQLConnect();
  const [results, fields] = await connection.query("show tables");
  return results;
}

//grabs all of the users
async function getUsers(){
  let connection = await SQLConnect();
	const [results,fields] = await connection.query("SELECT * FROM Users");
	return results;
}

//grabs all of the plants
async function getPlants(){
  let connection = await SQLConnect();
	const [results] = await connection.query("SELECT * FROM Plant");
	return results;
}

//Checks to see if the plant is in the database or not
//Returns true if the plant is in the database, false otherwise
async function checkPlant(plantName){
  let connection = await SQLConnect();
  const [results] = await connection.query("SELECT plantID FROM Plant WHERE plantID = ?",[plantName]);
  if(Object.keys(results).length == 0){
	  console.log("not here");
    return false
  }
  return true
}

//Checks to see if the plant is in the database or not
//Returns true if the plant is in the database, false otherwise
async function checkUser(username){
  let connection = await SQLConnect();
  const [results] = await connection.query("SELECT userID FROM Users WHERE userID = ?",[username]);
  if(Object.keys(results).length == 0){
    return false
  }
  return true
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
	return result;
}

//adds a plant into the database.
//param: building, areas--the location of the plant
//param: name-- the name given to the plant
//param: frequency-- the amount per mouth it needs to be watered
//param: statusType-- Whether the plant is 'Alive', 'Dead' or 'Gone'
async function addPlant(building,areas,name,frequency,statusType){
  let connection = await SQLConnect();
	let id = await addLocation(connection,building,areas);
	var locationID = id[0];
	const[result] = await connection.query("INSERT INTO Plant(locationID,plantName,waterFrequency,status) VALUES(?,?,?,?);",[locationID,name,frequency, statusType]);
	return id;
}

//Checks to see if the username is in use already
//param: user-- the username being checked
//returns: true if the username exists, false otherwise
async function isUsername(user){
  let connection = await SQLConnect();
	const[key] = await connection.query("SELECT userID FROM Users WHERE userID = ?",[newID]);
	if(Object.keys(key).length == 0){
		return false;
	}
	return true;
}

//Adds the user to the database
//param: username-- the unique ID of the user
//param: name -- the actual name of the user
//param: phoneNumber-- the phone number of the user
//param: role-- the type of the user
async function addUser(username,name,phoneNumber, role){
  let connection = await SQLConnect();
	const[result] = await connection.query("INSERT INTO Users(userID, name,phoneNumber,role) VALUES(?,?,?,?);",[username,name,phoneNumber,role]);
}

//Does the physical addition of the plant and person to the database	
async function addRelationshipCheck(username,plant){
	//*****need to check for duplicates *****
	let connection = await SQLConnect();
	const[result] = await connection.query("INSERT INTO PlantOwnership(userID, plantID) VALUES(?,?);",[username,plant]);
	return;
}

//Adds a relationship to the plant and person
async function addRelationship(username,plant){
	
	go = checkPlant(plant);
	go2 = checkUser(username);
	var promise = Promise.resolve(2);
  
	//used to get all of the variables called together
	Promise.all([go,go2]).then(values =>{
		console.log(values);
		if(values[0] == true && values[1] == true){
			addRelationshipCheck(username,plant)
		}else{
			console.log("Plant or person not in database");
			return;
		}
	});
}

//Adds a watering event to the table
//Param: username -- the username of the person who watered the plant
//Param: plant -- the id of the plant being watered
//Param: optional time -- the time that the plant was watered, which isn't needed
	//Needs to be inserted as YYYY-MM-DD HH, the rest is set automatically
async function addWateringEvent(username,plant,time){
	let connection = await SQLConnect();
	if (time == undefined){
		const[result] = await connection.query("INSERT INTO WaterEvent(plantID,userID) VALUES(?,?);",[plant,username]);	
	}
	
	//might need to check for duplicates here
	//sets the plant to zero minutes and zero seconds
	console.log(time);
	time += ":00:00.000"
	
	const[result] = await connection.query("INSERT INTO WaterEvent(plantID,userID,timeWatered) VALUES(?,?,?);",[plant,username,time]);	
	
}


//Runs the database functions
async function database(request, response) {
	
  //Should be a promise statement should each database query or addition
  
  let users = await  getUsers();
  addRelationship("jacknich",5);
  let plantuser = await showRelationships();
  //response.send(plantuser);
  
  addWateringEvent("jacknich",2,'2014-07-02 06');
  let fun = await getTimes();
  response.send(fun);
  return; 
}


module.exports = database;

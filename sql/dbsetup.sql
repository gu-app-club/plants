SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS PlantOwnership;
DROP TABLE IF EXISTS WaterEvent;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Plant;
DROP TABLE IF EXISTS Location;


/* Keeps track of each location on campus where a plant could be at */
CREATE TABLE Location(
	locationID int NOT NULL AUTO_INCREMENT,
	building text NOT NULL,
	area text NOT NULL, /*Should be a room number, a hallroom or etc. */
	PRIMARY KEY(locationID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Keeps track of each plant in the database */
CREATE TABLE Plant (
  plantID int NOT NULL AUTO_INCREMENT,
  locationID int,
  plantName text,
  waterFrequency int,
  status enum('Alive', 'Dead', 'Gone') default 'Alive',
  PRIMARY KEY(plantID),
  FOREIGN KEY(locationID) REFERENCES Location(locationID) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*The creditials of the user */
CREATE TABLE Users(
	userID VARCHAR(15) NOT NULL,
	name text NOT NULL,
	phoneNumber char(10) NOT NULL,
	role enum('User','Admin', 'Creator') default 'User',
	PRIMARY KEY(userID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Tracks the time and date a user watered a plant */
CREATE TABLE WaterEvent(
	waterID int NOT NULL AUTO_INCREMENT,
	plantID int NOT NULL,
	userID VARCHAR(15) NOT NULL,
	timeWatered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(waterID, plantID),
	FOREIGN KEY(plantID) REFERENCES Plant(plantID) ON DELETE CASCADE,
	FOREIGN KEY(userID) REFERENCES Users(userID) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Relationship between a person and a plant */
CREATE TABLE PlantOwnership(
	userID VARCHAR(15) NOT NULL,
	plantID int NOT NULL,
	PRIMARY KEY(userID, plantID),
	FOREIGN KEY(userID) REFERENCES Users(userID),
	FOREIGN KEY(plantID) REFERENCES Plant(plantID) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;



/* Insert test values */
INSERT INTO Location(Building,Area)
	VALUES("Herak","Room 324");

INSERT INTO Location(Building,Area)
	VALUES("PACCAR","Hallway by Tadrous's office");

INSERT INTO Plant(locationID,plantName, waterFrequency)
	VALUES(1,"Fern",7);
INSERT INTO Plant(locationID, plantName,waterFrequency)
	VALUES(2, "Botany",4);
	
INSERT INTO Users VALUES
	(48755,"Maxwell Dulin","3605085170","User");
	
INSERT INTO WaterEvent(plantID,userID)
	VALUES(1,48755);
	
INSERT INTO PlantOwnership VALUES
	(48755,1);

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


DROP TABLE WaterEvent;
DROP TABLE PlantOwnership;
DROP TABLE Plant;
DROP TABLE Location;
DROP TABLE Users;


/* Keeps track of each location on campus where a plant could be at */
CREATE TABLE Location(
	LocationID int NOT NULL AUTO_INCREMENT,
	Building text,
	Area text,
	PRIMARY KEY(LocationID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Keeps track of each plant in the database */
CREATE TABLE Plant (
  plantID int AUTO_INCREMENT,
  locationID int,
  plantName text,
  PRIMARY KEY(plantID),
  FOREIGN KEY(LocationID) REFERENCES Location(LocationID)

)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Tracks the time and date a user watered a plant */
CREATE TABLE WaterEvent(
	WaterID int AUTO_INCREMENT,
	PlantID int,
	TimeWatered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(WaterID),
	FOREIGN KEY(PlantID) REFERENCES Plant(plantID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*The creditials of the user */
CREATE TABLE Users(
	UserID int,
	Name text,
	PhoneNumber char(10),
	Role enum('User','Admin', 'Creator') default 'User',
	PRIMARY KEY(UserID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Relationship between a person and a plant */
CREATE TABLE PlantOwnership(
	UserID int,
	plantID int,
	PRIMARY KEY(UserID, plantID),
	FOREIGN KEY(UserID) REFERENCES Users(UserID),
	FOREIGN KEY(plantID) REFERENCES Plant(plantID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
	

/* Insert test values */
INSERT INTO Location(Building,Area)
	VALUES("Herak","Room 324");

INSERT INTO Location(Building,Area)
	VALUES("PACCAR","Hallway by Tadrous's office");

INSERT INTO Plant(locationID,plantName)
	VALUES(1,"Fern");
INSERT INTO Plant(locationID, plantName)
	VALUES(2, "Botany");
	
INSERT INTO WaterEvent(PlantID)
	VALUES(1);
	
INSERT INTO Users VALUES
	(48755,"Maxwell Dulin","3605085170","User");
	
INSERT INTO PlantOwnership VALUES
	(48755,1);

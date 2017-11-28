const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const authController = require("./controller/auth/authController.js");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Define routes
server.get("/api", function(request, response) {
  response.send("Hello from da backend.");
});

server.get("/api/login", authController.login);
server.get("/api/signup", authController.signup);
server.get("/api/database", authController.database);

module.exports = server;

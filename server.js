const express = require("express");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// Define routes
server.get("/api",function(request, response){
  response.send("Hello from da backend.");
});

module.exports = server;

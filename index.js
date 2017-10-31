console.log("Helloooo")


const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/router.js')

// Create app instance
const app = express()

// Apply Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Define routes
app.use("/", router)


app.get("/",function(request, response){
  response.send("I'm homepage");
});

// Start the server
app.listen(3000, function() {
  console.log(`Server up..`)
})

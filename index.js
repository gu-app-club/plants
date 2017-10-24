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

// Use a different port for tester so we can run both at once
let port = (process.env.NODE_ENV == 'test') ? 3080 : 3000

// Start the server
app.listen(port, function() {
  console.log(`Server up..`)
})

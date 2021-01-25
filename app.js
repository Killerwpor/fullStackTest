// Requires
require('./dbConfig')
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000

//Settings
app.use(cors({
    origin: '*'
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
const userRoutes = require("./routes/userRoutes.js");

app.use("/api/user", userRoutes);

//Some basic error handling for debuggin
app.use((req, res, next) => {
    const error = new Error("Path Not Found");
    error.status = 404;
    next(error);
  });
  


 //Run server 
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})








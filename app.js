// Requires
require("./dbConfig");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
var argv = require("minimist")(process.argv.slice(2));

//Settings
var subpath = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1", subpath);
var swagger = require("swagger-node-express").createNew(subpath);
swagger.setApiInfo({
  title: "example API",
  description: "API to do something, manage something...",
  termsOfServiceUrl: "",
  contact: "yourname@something.com",
  license: "",
  licenseUrl: "",
});

app.use(express.static("dist"));

app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.get("/api-info", function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

// Configure the API domain

const userRoutes = require("./routes/userRoutes.js");
const coinRoutes = require("./routes/coinRoutes.js");

app.use("/api/user", userRoutes);
app.use("/api/coin", coinRoutes);

//Some basic error handling for debuggin
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Run server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

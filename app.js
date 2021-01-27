// Requires
require("./dbConfig");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

//Settings

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

// Routes
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

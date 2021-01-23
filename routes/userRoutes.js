//Requires
const controlador = require("../controllers/userController");
const express = require("express");
const router = express.Router();

//Routes
router.get('/',controlador.funcionPrueba);

module.exports = router;
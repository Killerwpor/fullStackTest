//Requires
const authValidator = require("../middleware/auth");
const controlador = require("../controllers/userController");
const express = require("express");
const router = express.Router();

//Routes

router.post("/guardarUsuario", controlador.guardarUsuario);

router.post("/login", controlador.login);

router.post("/listarMonedas", controlador.listarMonedas);

router.post("/topTresMonedas", controlador.topTresMonedas);

module.exports = router;

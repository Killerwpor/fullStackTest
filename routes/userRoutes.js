//Requires
const authValidator = require("../middleware/auth");
const controlador = require("../controllers/userController");
const express = require("express");
const router = express.Router();

//Routes

router.post("/guardarUsuario", controlador.guardarUsuario);

router.post("/login", controlador.login);

router.get("/listarMonedas", controlador.listarMonedas);

router.get("/topTresMonedas", controlador.topTresMonedas);

module.exports = router;

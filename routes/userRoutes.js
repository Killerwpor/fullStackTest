//Requires
const authValidator = require("../middleware/auth");
const controlador = require("../controllers/userController");
const express = require("express");
const router = express.Router();

//Routes
router.get("/", authValidator.validateToken, controlador.traerUsuarios);

router.post("/guardarUsuario", controlador.guardarUsuario);

router.post("/login", controlador.login);

router.post("/guardarMoneda", controlador.guardarMoneda);

router.get("/listarMonedas", controlador.listarMonedas);

router.get("/topTresMonedas", controlador.topTresMonedas);

module.exports = router;

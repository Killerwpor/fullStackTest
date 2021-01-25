//Requires
const authValidator = require("../middleware/auth")
const controlador = require("../controllers/userController");
const express = require("express");
const router = express.Router();

//Routes
router.get('/', authValidator.validateToken, controlador.traerUsuarios);

router.post('/guardarUsuario', authValidator.validateToken, controlador.guardarUsuario);

router.post('/login',controlador.login);

module.exports = router;
//Requires
const authValidator = require("../middleware/auth");
const controlador = require("../controllers/coinController");
const express = require("express");
const router = express.Router();

//Routes
router.post(
  "/guardarMoneda",
  authValidator.validateToken,
  controlador.guardarMoneda
);
router.get("/traerMonedas", controlador.traerMonedas);

module.exports = router;

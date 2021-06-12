/*
    path:api/simulador/
*/

const { Router } = require("express");

const { preguntasSimulador } = require("../controllers/preguntas");

const router = Router();

router.get("/", preguntasSimulador);
router.get("/:de", preguntasSimulador);

module.exports = router;
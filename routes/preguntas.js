/*
    path:api/preguntas/:de/?desde
*/

const { Router } = require("express");

const { crearPregunta, obtenerPreguntas, obtenerTodasPreguntas } = require("../controllers/preguntas");
const { validarToken } = require("../middlewares/validar-token-fb");

const router = Router();

router.post("/",
    validarToken,
    crearPregunta
);

router.get("/:de", obtenerPreguntas);
router.get("/todo/:de", obtenerTodasPreguntas);

module.exports = router;
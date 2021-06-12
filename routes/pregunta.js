/*
    path:api/pregunta/:id
*/

const { Router } = require("express");
const { validarToken } = require("../middlewares/validar-token-fb");

const { obtenerPregunta, agregarComentario, agregarLikeComentario, eliminarPregunta, actualizarPregunta } = require("../controllers/preguntas");
const { isAdmin } = require("../middlewares/isAdmin");

const router = Router();


router.get("/:id", obtenerPregunta);

router.put('/comentario/:id', agregarComentario);

router.put('/likes/:id', agregarLikeComentario);

router.delete('/:id',
    validarToken,
    isAdmin,
    eliminarPregunta,
);

router.put('/actualizar/:id',
    validarToken,
    isAdmin,
    actualizarPregunta
)

module.exports = router;

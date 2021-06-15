/*
    path:api/pregunta/:id
*/

const { Router } = require("express");
const { validarToken } = require("../middlewares/validar-token-fb");

const { guardarSimulacion } = require("../controllers/infousuario");

const router = Router();

router.put('/', 
    validarToken,
    guardarSimulacion
);

module.exports = router;

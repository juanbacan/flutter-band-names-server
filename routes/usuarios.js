/*
    path:api/usuarios
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getUsuarios } = require('../controllers/usuarios');

const router = Router();

// validar JWT
router.get("/", validarJWT, getUsuarios);



module.exports = router;
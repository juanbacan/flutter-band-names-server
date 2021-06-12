/*
    path:api/token
*/

const { Router } = require("express");

const { validarToken } = require("../controllers/token");

const router = Router();


router.get("/", validarToken);

module.exports = router;
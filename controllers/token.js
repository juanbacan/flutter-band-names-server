
const { response } = require("express");
const { defaultAuth } = require("../index");        // Firebase Auth
const Usuario = require('../models/usuario');

const validarToken = async (req, res =  response) => {

    const idToken = req.header('x-token');

    defaultAuth.verifyIdToken(idToken)
    .then(async (decodedToken) => {
        const uid = decodedToken.uid;
        const usuario = await Usuario.findOne({ uid });
        if (!usuario) {
            return res.json({
                ok: false,
                msg: "No es usuario admin",
                admin: false
            });
        }
        res.json({
            ok: true,
            admin: true,
        });
    })
    .catch((error) => {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "Token no válido o no disponible",
        });
    });
}

module.exports = {
    validarToken
}
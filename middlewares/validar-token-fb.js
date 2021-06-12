const { json } = require('express');
const jwt = require('jsonwebtoken');
const { defaultAuth } = require("../index");

const validarToken = ( req, res, next ) => {

    // Leer el token
    const idToken = req.header('x-token');

    if( !idToken ){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        });
    }

    defaultAuth.verifyIdToken(idToken)
    .then(async (decodedToken) => {
        const uid = decodedToken.uid;
        req.uid = uid;
        next();
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
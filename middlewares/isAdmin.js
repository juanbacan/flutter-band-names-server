const { validationResult } = require("express-validator");
const Usuario = require('../models/usuario');

const isAdmin = async (req, res, next) => {

    const uid = req.uid;
    const usuario = await Usuario.findOne({ uid });
    if (!usuario) {
        return res.status(401).json({
            ok: false,
            msg: "No es usuario admin",
            admin: false
        });
    }
    console.log("Es un usuario admin");
    next();
}

module.exports = {
    isAdmin
}
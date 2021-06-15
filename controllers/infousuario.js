const { response } = require("express");
const InfoUsuario = require("../models/infousuario");

const guardarSimulacion = async (req, res = response) => {
    try {
        const {uid, body} = req;
        const { materia, tiempo, puntaje, preguntas } = body;

        const usuario = await InfoUsuario.findById(uid);

        if(usuario){
            let simulaciones = usuario.simuladores[materia];  // puntaje, tiempo, intentos

            const horaNueva = new Date();
            horaNueva.setUTCHours(tiempo.h, tiempo.m, tiempo.s);

            if(!simulaciones) simulaciones = [];

            if(simulaciones.length > 5) simulaciones.pop();

            simulaciones.push(
                {
                    fecha: Date.now(),
                    preguntas,
                    puntaje,
                    tiempo: horaNueva,
                }
            );
            const simulacionAnterior = usuario.simuladores;
            const simulacionActual = {
                ...simulacionAnterior,
                [materia] : simulaciones
            };
            await InfoUsuario.findByIdAndUpdate(uid, {simuladores: simulacionActual});

        }else{
            const simulacion = {};
            simulacion._id = uid;

            const horaNueva = new Date();
            horaNueva.setUTCHours(tiempo.h, tiempo.m, tiempo.s);

            simulacion.simuladores = {
                [materia] : [{
                    fecha: Date.now(),
                    preguntas,
                    puntaje, 
                    tiempo: horaNueva,
                }]
            }
            const simulacionDB = new InfoUsuario(simulacion);
            await simulacionDB.save();
            res.json({
                ok: true,
                msg: "Simulación guardada con éxito"
            });
        }        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error",
        });   
    }
}

module.exports = {
    guardarSimulacion
}
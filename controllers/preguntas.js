const { response } = require("express");

const Pregunta = require("../models/pregunta");
const Comentario = require("../models/comentario");


const crearPregunta = async ( req, res = response ) => {
    try {
        const pregunta = new Pregunta( req.body );
        console.log(pregunta);
        await pregunta.save(); 
        res.json({
            ok: true,
            msg: req.body
        });
        console.log("Pregunta Creada");
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Token no válido o no disponible",
        });   
    }
}

const eliminarPregunta = async ( req, res = response ) => {
    const preguntaId = req.params.id;
    
    try {
        // Comprobar si la tarea existe
        const pregunta = await Pregunta.findById(preguntaId);

        // TODO ver si la pregunta pertenece al usuario 

        // Eliminar Pregunta
        await Pregunta.findOneAndRemove({_id: preguntaId});
        res.json({msg: "Pregunta Eliminada"});
        console.log("Eliminando pregunta");
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

const actualizarPregunta = async ( req, res = response ) => {

    //Actualizando pregunta

    const preguntaId = req.params.id;
    const preguntaNueva = req.body;

    try {
        preguntaActualizada = await Pregunta.findOneAndUpdate({_id: preguntaId}, preguntaNueva, {new:true});    // Actualiza la pregunta
        res.json({
            pregunta: preguntaActualizada,
            ok: true,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: 'Hubo un error al actualizar la pregunta'});
    }
}

const obtenerPregunta = async ( req, res = response ) => {

    const preguntaId = req.params.id;

    if( typeof preguntaId === "undefined"){
        console.log("No hay id de la pregunta");
        return res.status(404).json({msg: 'La consulta debe tener el ID de la pregunta'});
    }

    try {
        const pregunta = await Pregunta.findById(preguntaId);
        // Si la Pregunta existe o no
        if(!pregunta) {
            return res.status(404).json({msg: 'Pregunta no encontrada'});
        }

        res.json({
            ok: true,
            pregunta,
        });

    } catch (error) {
        return res.status(404).json({msg: 'La consulta debe tener el ID de la pregunta válido'});
    }
}

const obtenerPreguntas = async ( req, res = response ) => {

    const preguntasDe = req.params.de;
    const desde = Number (req.query.desde) || 0;
    
    const preguntas = await Pregunta
        // .where("aprobada")
        // .equals(true)
        // .where("tipo")
        // .equals(preguntasDe)        // Retorna el tipo
        .find({aprobada: true, tipo: preguntasDe})
        .sort({creado: "asc"})     // Retorna el desde el más reciente
        .skip(desde)                // Retorna desde un número fijo
        .limit(5);                  // Solo retorna 5 preguntas

    res.json({
        ok: true,
        preguntas,
    });
}

const obtenerTodasPreguntas = async ( req, res = response ) => {
    console.log("Consultando todas las preguntas de una materia");

    const preguntasDe = req.params.de;
    const preguntas = await Pregunta.find({tipo: preguntasDe})
    .sort({creado: "asc"});

    res.json({
        ok: true,
        preguntas
    })
}

const preguntasSimulador = async ( req, res = response ) => { 
    
    const preguntasDe = req.params.de;

    let preguntas;

    if( typeof preguntasDe === "undefined"){
        console.log("indefinido");
        preguntas = await Pregunta.find({simulador: true});
    }else{
        preguntas = await Pregunta.find({simulador: true, tipo: preguntasDe});
    }

    res.json({
        ok: false,
        preguntas,
    });
}

const agregarLikeComentario = async ( req, res = response ) => {

    // 
    console.log("Agregando like a comentario");

    const preguntaId = req.params.id;                               // Obtiene el Id de la pregunta que viene de parámetro
    const { likes, uid } = req.body;                                // Recibe el like en el body de la consulta { uid, likes }

    console.log(likes, uid);

    try {
        const pregunta = await Pregunta.findById(preguntaId);       // Busca la pregunta con el Id que viene de parámetro
        if(!pregunta){
            return res.status(404).json({msg: 'Pregunta no encontrada'});
        }

        const comentarios = pregunta.comentarios;
        let newComentarios = [];

        comentarios.forEach(comentario => {                         // Actualiza los likes del comentario con el uid especificado

            
            if (comentario.uid === uid){
                let newComentario = comentario; 
                newComentario.likes = likes;
                newComentarios.push(newComentario);
            }else{
                newComentarios.push(comentario);
            }
        });

        console.log(newComentarios);

        let nuevaPregunta = pregunta;
        nuevaPregunta.comentarios = newComentarios;              // Actualiza los comentarios
        
        preguntaActualizada = await Pregunta.findOneAndUpdate({_id: preguntaId}, nuevaPregunta, {new:true});    // Actualiza la pregunta

        res.json({
            pregunta: preguntaActualizada,
            ok: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: 'Hubo un error al consultar a la BD'});
    }

}

const agregarComentario = async ( req, res = response ) => {

    console.log("Agregando un comentario en la pregunta");

    const preguntaId = req.params.id;                               // Obtiene el Id de la pregunta que viene de parámetro
    const comentario = req.body;                                    // Recibe el comentario en el body de la consulta

    try {
        const pregunta = await Pregunta.findById(preguntaId);       // Busca la pregunta con el Id que viene de parámetro

        if(!pregunta){
            return res.status(404).json({msg: 'Pregunta no encontrada'});
        }

        let comentarios = pregunta.comentarios;                     // Obtiene los comentarios
        let nuevosComentarios = [...comentarios, comentario];       // Agrega el nuevo comentario
        
        let nuevaPregunta = pregunta;
        nuevaPregunta.comentarios = nuevosComentarios;              // Actualiza los comentarios
        
        preguntaActualizada = await Pregunta.findOneAndUpdate({_id: preguntaId}, nuevaPregunta, {new:true});    // Actualiza la pregunta

    } catch (error) {
        res.status(500).send('Hubo un error');
    }

    res.json({
        pregunta: preguntaActualizada,
        ok: true,
    });
}

module.exports = {
    crearPregunta,
    obtenerPreguntas,
    preguntasSimulador,
    obtenerPregunta,
    agregarComentario,
    agregarLikeComentario,
    obtenerTodasPreguntas,
    eliminarPregunta,
    actualizarPregunta
}
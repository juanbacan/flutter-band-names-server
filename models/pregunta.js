const { Schema, model } = require("mongoose");

const PreguntaSchema = Schema({

    aprobada: {
        type: Boolean,
        default: false,
    },
    comentarios: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    creado: {
        type: Number,
        default: 0
    },
    enunciado: {
        type: String,
    },
    nombre: {
        type: String
    },
    respuestaCorrecta: {
        type: String
    },
    respuestas: {
        type: Object
    },
    simulador: {
        type: Boolean,
        default: false
    },
    tipo: {
        type: String,
        default: "matematicas"
    },
    uid: {
        type: String,
        default: "11111"
    }
});

// Regresamos solo los datos importantes
PreguntaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Pregunta", PreguntaSchema);
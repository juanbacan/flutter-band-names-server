const { Schema, model } = require("mongoose");

const ComentarioSchema = Schema({
    // aprobada: {
    //     type: Boolean,
    //     default: false,
    // },
    // creado: {
    //     type: Number,
    //     default: 0
    // },
    comentarios: {
        type: Array,
        default: []
    },
    idPregunta: {
        type: String,
        default: "11111"
    }
});

// Regresamos solo los datos importantes
ComentarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Comentario", ComentarioSchema);
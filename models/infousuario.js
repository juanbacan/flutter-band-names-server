const { Schema, model } = require('mongoose');

const InfouserSchema = Schema({
    _id: {
        type: String,
        require: true,
    },
    simuladores: {
        type: Object,
        require: false,
    },   
});

// Regresamos somos los datos importantes
InfouserSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    //object.uid = _id;
    return object;
});

module.exports = model('InfoUsuario', InfouserSchema);
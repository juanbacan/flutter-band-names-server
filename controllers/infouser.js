const { Schema, model } = require('mongoose');

const InfouserSchema = Schema({
    uid: {
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

module.exports = model('Usuario', InfouserSchema);
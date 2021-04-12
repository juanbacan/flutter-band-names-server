const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/Bands");

const bands = new Bands();
//console.log("init-server");

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Guns and Roses"));
bands.addBand(new Band("Placebo"));
bands.addBand(new Band("Seafret"));

//console.log(bands);

//  Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente conectado");

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });
    


});
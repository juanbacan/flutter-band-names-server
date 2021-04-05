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

    client.emit("active-bands", bands.getBands());

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on("mensaje", (payload) => {
        console.log("Mensaje!!!", payload);
        io.emit("mensaje", { admin: "Nuevo Mensaje" });
    });

    client.on('vote-band', (payload) => {

        //console.log(payload);
        bands.voteBand( payload.id );
        io.emit("active-bands", bands.getBands());

    });

    client.on('add-band', (payload) => {
        const newBand = new Band( payload.name );
        //console.log(payload);
        bands.addBand( newBand );
        io.emit("active-bands", bands.getBands());

    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit("active-bands", bands.getBands());

    });

    // client.on('emitir-mensaje', (payload) => {
    //     //io.emit("nuevo-mensaje", payload);  //emite a todos
    //     console.log(payload);
    //     client.broadcast.emit("nuevo-mensaje", payload); // emite a todos menos al qie lo emitio
    // });



});
const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/Bands");

const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

const bands = new Bands();
//console.log("init-server");

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Guns and Roses"));
bands.addBand(new Band("Placebo"));
bands.addBand(new Band("Seafret"));

//console.log(bands);

//  Mensajes de Sockets
io.on('connection', (client) => {
    console.log("Cliente conectado");

    // Cliente con JWT
    const [ valido, uid ] = comprobarJWT(client.handshake.headers["x-token"]);

    if(!valido) { return client.disconnect();}

    // Cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario en una sala especifica
    // Sala global, client id, uid
    client.join( uid );
    //client.to( uid ).emit("Hola");

    // Escuchar del cliente el mensaje personal
    client.on("mensaje-personal", async (payload) => {
        
        await grabarMensaje( payload );

        io.to( payload.para ).emit('mensaje-personal', payload);

    });




    client.on('disconnect', () => {
        console.log("Cliente desconectado");
        usuarioDesconectado(uid);
    });
    


});
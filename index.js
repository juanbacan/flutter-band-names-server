const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');


// Firebase
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports.defaultAuth = admin.auth();

// DB Config
const { dbConnection } = require("./database/config");
dbConnection();

// App de Express
const app = express();


// Lectura y parseo del body
app.use( express.json() ); 


// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require("./sockets/socket");


// Path público
const publicPath = path.resolve( __dirname, 'public' );

app.use(cors());
app.use( express.static( publicPath ));


// Mis rutas
//app.use( "/api/login", require("./routes/auth"));
//app.use( "/api/usuarios", require("./routes/usuarios"));
//app.use( "/api/mensajes", require("./routes/mensajes"));          // 
app.use( "/api/preguntas", require("./routes/preguntas"));        // Realiza la consulta de un grupo de preguntas
app.use( "/api/simulador", require("./routes/simulador"));    
app.use( "/api/pregunta", require("./routes/pregunta"));          // Realiza la consulta de una sola pregunta        
app.use( "/api/token", require("./routes/token"));                // Comprobar si el usuario es administrador o no
app.use( "/api/infousuario", require("./routes/infousuario"));    // Informacion del usuario: simuladores

server.listen( process.env.PORT, (err) => {
    if(err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${3001} !!!`)
});
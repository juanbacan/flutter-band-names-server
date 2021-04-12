const mongoose = require("mongoose");
const dbConnection = async() => {
    try {
        console.log("Init DB config");
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("DB.online");

    } catch (error) {
        console.log(error);
        throw new Error("Error en la BD");
    }
}

module.exports = {
    dbConnection
}
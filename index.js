'use strict'

var mongoose = require( 'mongoose' );
var app      = require( './app' );
var port     = process.env.PORT || 8080

mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://localhost:27017/methodology', ( error, response ) => {

    if( error ) {
        throw error;
    }
    else {
        console.log( 'Conectado a la base de datos AGIL ...' )

        app.listen( port, () => console.log( `API AGIL escuchando en el puerto ${port}` ) )
    }
} );
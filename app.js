'use strict'

var express    = require( 'express'     );
var bodyParser = require( 'body-parser' );

var app = express();


// Cargar rutas
var project_routes = require( './routes/project' );
var epic_routes    = require( './routes/epic'    );
var story_routes   = require( './routes/story'   );

app.use( bodyParser.urlencoded( { extended:false } ) );
app.use( bodyParser.json() );

// Configurar cabeceras HTTP
app.use( ( req, res, next ) => {
    res.header( 'Access-Control-Allow-Origin' , '*' );
    res.header( 'Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method' );
    res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
    res.header( 'Allow', 'GET, POST, PUT, DELETE, OPTIONS' );

    next();
} );

// Rutas base
app.use( '/api/v1/project' , project_routes );
app.use( '/api/v1/epic'    , epic_routes    );
app.use( '/api/v1/story'   , story_routes   );


module.exports = app;
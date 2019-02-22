'use strict'
var Epic   = require( '../models/epic' );
var Util   = require( '../utilities/util'  );

function test( req, res ) {
    res.status( 200 ).send( { message: 'Epic controller funcionando' } );
}


function list( req, res ) {
    var project;
    
    //console.log( req.params );

    if( Util.isValidParam( 'project', req.params.project ) ) { project = req.params.project; }
   
    try
    {
        var filtros = {};
        if (project != 0)
        filtros = { project: project };

        //Epic.find( filtros, ( err, storage ) => {
        Epic.find( filtros ) .populate('project').exec( function(err, storage ) {

            if( err ) { 
                console.log("err");
                console.log(err);
                res.status( 500 ).send( { cod: 1, msg: `Error al obtener las caracteristicas` } ); 
            }
            else {
                if( ! storage ) { 
                    res.status( 202 ).send( { cod: 1, msg: 'No existen caracteristicas' } ); 
                }
                else {
                        
                        console.log("storage");
                        console.log(storage);
                        res.status( 200 ).send( { cod: 0, msg: 'Operación realizada correctamente', entity: storage } );
                }
            }
        });
    }
    catch( error ) {
        res.status( 202 ).send( { cod: 1, msg: 'Error de excepcion' , entity:error} ); 
    }
}
function save( req, res ) {
    var mongoose = require( 'mongoose' );
    var epic   = new Epic();
    var params = req.body; 
    var filtros;

    if( Util.isValidParam( 'name'       , params.name        ) ) { epic.name        = params.name;        }
    if( Util.isValidParam( 'description', params.description ) ) { epic.description = params.description; }
    if( Util.isValidParam( 'project'    , params.project     ) ) { epic.project     = params.project;     }

    if (params._id != null){
        filtros = { _id: params._id };
    } else {
        filtros = { _id: mongoose.mongo.ObjectID()};
    }

    Epic.findOneAndUpdate( filtros
                         , { name: epic.name, description: epic.description, project: epic.project }
                         , { upsert: true, new: true }, ( err, storage ) => {
        if( err ) { 
            //console.log( err );
            res.status( 500 ).send( { cod: 1, msg: `Error al crear la caracteristica ${epic.name}` } ); 
        }
        else {
            res.status( 200 ).send( { cod: 0, msg: `Caracteristica ${epic.name} actualizada`, entity: storage } ); 
        }
    });
}


module.exports = { 
    test,
    list,
    save
}

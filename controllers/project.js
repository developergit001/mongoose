'use strict'

var Project = require( '../models/project' );
var Util    = require( '../utilities/util'  );


function test( req, res ) {
    res.status( 200 ).send( { message: 'Project controller funcionando' } );
}


function list( req, res ) {
    try
    {
        Project.find( {}, ( err, storage ) => {
            if( err ) { 
                res.status( 500 ).send( { cod: 1, msg: `Error al obtener los proyectos` } ); 
            }
            else {
                if( ! storage ) { 
                    res.status( 202 ).send( { cod: 1, msg: 'No existen proyectos' } ); 
                }
                else {
                    res.status( 200 ).send( { cod: 0, msg: 'Operación realizada correctamente', entity: storage } );
                }
            }
        });
    }
    catch( error ) {
        res.status( 202 ).send( { cod: 1, msg: error } ); 
    }
}


function save( req, res ) {
    var project = new Project();
    var params  = req.body; 
    
    if( Util.isValidParam( 'name'       , params.name        ) ) { project.name        = params.name;        }
    if( Util.isValidParam( 'description', params.description ) ) { project.description = params.description; }

    Project.findOneAndUpdate( { name: project.name }
                            , { name:project.name, description: project.description }
                            , { upsert: true, new: true }, ( err, storage ) => {
        if( err ) { 
            console.log( err );
            res.status( 500 ).send( { cod: 1, msg: `Error al crear el proyecto ${project.name} (findOne)` } ); 
        }
        else {
            res.status( 200 ).send( { cod: 0, msg: `Proyecto ${project.name} actualizado`, entity: storage } ); 
        }
    });
}


module.exports = { 
    test,
    list,
    save
}

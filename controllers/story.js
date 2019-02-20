'use strict'

var Story  = require( '../models/story' );
var Util   = require( '../utilities/util'  );


function test( req, res ) {
    res.status( 200 ).send( { message: 'History controller funcionando' } );
}


function list( req, res ) {
    var epic;
    
    if( Util.isValidParam( 'epic', req.params.epic ) ) { epic = req.params.epic; }
   
    try
    {

        var filtros = {};
        if (epic != 0)
        filtros = { epic: epic };

        Story.find( filtros, ( err, storage ) => {
            if( err ) { 
                res.status( 500 ).send( { cod: 1, msg: `Error al obtener las historias de usuario` } ); 
            }
            else {
                if( ! storage ) { 
                    res.status( 202 ).send( { cod: 1, msg: 'No existen historias de usuario' } ); 
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
    var story  = new Story();
    var params = req.body; 
    
    if( Util.isValidParam( 'title'       , params.title       ) ) { story.title       = params.title;       }
 //   if( Util.isValidParam( 'identifier' , params.identifier  ) ) { story.identifier = params.identifier;  }
    if( Util.isValidParam( 'description', params.description ) ) { story.description  = params.description; }
    if( Util.isValidParam( 'estimate'   , params.estimate    ) ) { story.estimate     = params.estimate;    }
    if( Util.isValidParam( 'priority'   , params.priority    ) ) { story.priority     = params.priority;    }
    if( Util.isValidParam( 'epic'       , params.epic        ) ) { story.epic         = params.epic;        }

    Story.findOneAndUpdate( { title: story.title }, {
  //                            identifier: story.identifier
                              description: story.description
                            , estimate: story.estimate
                            , priority: story.priority
                            , epic: story.epic
                           }
                         , { upsert: true, new: true }, ( err, storage ) => {
        if( err ) { 
            res.status( 500 ).send( { cod: 1, msg: `Error al crear la historia de usaurio ${story.title}` } ); 
        }
        else {
            res.status( 200 ).send( { cod: 0, msg: `Historia de usuario ${story.title} actualizada`, entity: storage } ); 
        }
    });
}


module.exports = { 
    test,
    list,
    save
}

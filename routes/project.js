'use strict'

var express  = require( 'express'                );
var project  = require( '../controllers/project' );
//var md_auth  = require( '../middlewares/authenticated' );
var api      = express.Router();

// api.get ( '/test'     , md_auth.ensureAuth, province.test  );
api.get ( '/test' , project.test );
api.get ( '/list' , project.list );
api.post( '/save' , project.save );

module.exports = api;
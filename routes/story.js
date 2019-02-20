'use strict'

var express  = require( 'express'              );
var story    = require( '../controllers/story' );
//var md_auth  = require( '../middlewares/authenticated' );
var api      = express.Router();

// api.get ( '/test'     , md_auth.ensureAuth, province.test  );

api.get ( '/test'       , story.test );
api.get ( '/list/:epic' , story.list );
api.post( '/save'       , story.save );

module.exports = api;
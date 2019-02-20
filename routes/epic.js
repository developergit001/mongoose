'use strict'

var express  = require( 'express'             );
var epic     = require( '../controllers/epic' );
//var md_auth  = require( '../middlewares/authenticated' );
var api      = express.Router();

// api.get ( '/test'     , md_auth.ensureAuth, province.test  );
api.get ( '/test'         , epic.test );
api.get ( '/list/:project', epic.list );
api.post( '/save'         , epic.save );

module.exports = api;
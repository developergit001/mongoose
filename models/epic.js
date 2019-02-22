'use strict'

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
//var Project   = require( './project' ); //Se puede pasar Project sin comillas pasando el modelo

var epicSchema = Schema( {
    name: { type: String, required: true },
    description: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, required: true, ref: 'Project' } //Se puede pasar Project sin comillas pasando el modelo
} );
//https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose
epicSchema.set('collection', 'Epic');
module.exports = mongoose.model( 'Epic', epicSchema );
'use strict'

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var projectSchema = Schema( {
    name: { type: String, required: true },
    description: { type: String, required: true }
} );
//https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose
projectSchema.set('collection', 'Project');
module.exports = mongoose.model("Model", projectSchema, "Project");
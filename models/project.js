'use strict'

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var projectSchema = Schema( {
    //_id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String, required: true }
} );
//https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose
projectSchema.set('collection', 'Project');
module.exports = mongoose.model("Project", projectSchema);
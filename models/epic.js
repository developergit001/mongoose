'use strict'

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var epicSchema = Schema( {
    name: { type: String, required: true },
    description: { type: String, required: true },
    project: { type: Schema.ObjectId, required: true, ref: 'Project' }
} );

module.exports = mongoose.model( 'Epic', epicSchema );
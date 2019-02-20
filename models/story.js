'use strict'

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var storySchema = Schema( {
    title: { type: String, required: true },
    identifier: { type: String, required: false },
    description: { type: String, required: true },
    estimate: { type: Number, required: true },
    priority: { type: Number, required: true },
    epic: { type: Schema.ObjectId, required: true, ref: 'Epic' },
    dependencies:[ { type: Schema.ObjectId, ref: 'Story' } ]
} );

module.exports = mongoose.model( 'Story', storySchema );
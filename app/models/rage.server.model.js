'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rage Schema
 */
var RageSchema = new Schema({
	licensePlate: {
		type: String,
		default: '',
		required: 'Please enter their License Plate #!',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    state: {
        type: String,
        default: '',
        required: 'Please enter a State!'
    },
    description: {
        type: String,
        default: '',
        required: 'You need to enter a description!'
    }
});

mongoose.model('Rage', RageSchema);
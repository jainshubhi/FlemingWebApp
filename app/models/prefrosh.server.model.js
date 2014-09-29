'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Prefrosh Schema
 */
var PrefroshSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Prefrosh name',
		trim: true
	},
	lunchDate: {
		type: Date
	},
	dinnerDate: {
		type: Date
	},
	dessertDate: {
		type: Date
	},
	comments: {
		type: Array,
		body: String
	},
	picture: {
		type: String,
		default: '',
		trim: true
	},
	pdfInfo: {
		type: String,
		default: '',
		trim: true
	},
	q1: {
		type: Number,
		match: [/^([1-9]|10)$/, 'Please fill a valid number!']
	},
	q2: {
		type: Number,
		match: [/^([1-9]|10)$/, 'Please fill a valid number!']
	},
	q3: {
		type: Number,
		match: [/^([1-9]|10)$/, 'Please fill a valid number!']
	},
	q4: {
		type: Number,
		match: [/^([1-9]|10)$/, 'Please fill a valid number!']
	},
	rating: {
		type: Number,
		default: 0
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Prefrosh', PrefroshSchema);

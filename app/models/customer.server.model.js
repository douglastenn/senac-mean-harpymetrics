// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

// Define a new 'CustomerSchema'
var CustomerSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	cpf: String,
	email: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Email inválido"]
	},
	username: {
		type: String,
		// Set a unique 'username' index
		unique: true,
		// Validate 'username' value existance
		required: 'Username é obrigatório',
		// Trim the 'username' field
		trim: true
	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [

			function(password) {
				return password && password.length > 5;
			}, 'Senha deve ter mais que 5 caracteres'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String
	},
	providerId: String,
	providerData: {},
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	},
	token: String
});

// Set the 'fullname' virtual property
CustomerSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Customer', CustomerSchema);
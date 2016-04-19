/**
 * Created by alex on 19/04/16.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongoose_plugins = require('../utils/mongoose_plugins');
var helpers = require('../utils/helpers');

var maritalStatusValues=['single', 'married', 'divorced'];
var ClientSchema   = new Schema({
	name: {type: String, required: true, trim:true},
	surname: String,
	email: {type: String, required: true, unique:true, trim:true},
	CPF: {type: String, required: true, unique:true},
	address: String,
	phone_number: [
		{ type: String }
	],
	marital_status: {type: String, enum: maritalStatusValues}
});
ClientSchema.plugin(mongoose_plugins.timestamps);

ClientSchema.path('CPF').validate(function (value) {
	return helpers.verifyCPF(value);
}, 'Invalid CPF');

ClientSchema.path('phone_number').validate(function (values) {
	return helpers.verifyPhoneNumber(values);
}, 'Invalid phone number');

ClientSchema.path('email').validate(function (value) {
	return helpers.verifyEmail(value);
}, 'Invalid email');

//Transform
ClientSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret, options) {
		delete ret._id;
		delete ret.__v;
	}
});

var Client = module.exports = mongoose.model('Client', ClientSchema);
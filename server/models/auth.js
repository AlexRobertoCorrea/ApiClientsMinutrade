/**
 * Created by alex on 20/04/16.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongoose_plugins = require('../utils/mongoose_plugins');

var maritalStatusValues=['single', 'married', 'divorced'];
var AuthSchema   = new Schema({
	client: {
		id: {type: String},
		name: {type: String, required: true, trim:true},
		surname: String,
		email: {type: String, required: true, trim:true},
		CPF: {type: String, required: true},
		address: String,
		phone_number: [
			{ type: String }
		],
		marital_status: {type: String, enum: maritalStatusValues}
	},
	lastLogin: {type: Date, required:true}
});
AuthSchema.plugin(mongoose_plugins.timestamps);

//Transform
AuthSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret, options) {
		delete ret._id;
		delete ret.__v;
	}
});

module.exports = mongoose.model('Auth', AuthSchema);
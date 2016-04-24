/**
 * Created by alex on 20/04/16.
 */
var Q = require('q');
var _ = require('underscore');
var path = require('path');
var config = require('../config');
var Client = require('../models/client');
var Auth = require('../models/auth');
var ERRORS=require('../utils/constants').ERRORS;
var crypter=require('../utils/crypter');

function createAuthFromClient(client) {
	var p = JSON.parse(JSON.stringify(client));
	var auth = new Auth({
		client: p,
		lastLogin: new Date()
	});

	return Q.ninvoke(auth,'save').spread(_.identity);
}

function getClientByEmail(email) {
	if(_.isEmpty(email))
		return Q.reject(ERRORS.unauthorized);

	return Q.ninvoke(Client, 'findOne', {
		$or: [{email: email}, {'responsible.email': email}],
		inactiveAt: null,
		deletedAt: null
	}).then(function(client) {
		if(!client)
			return Q.reject(ERRORS.unauthorized);

		return client;
	});
}
module.exports.clientLogin=function(email, password) {
	if(_.isEmpty(email)|| _.isEmpty(password))
		return Q.reject(ERRORS.unauthorized);

	return getClientByEmail(email).then(function(client) {
		var pass = client.password;
		if(!crypter.validate(pass, password))
			return Q.reject(ERRORS.unauthorized);

		return client;
	}).then(function(client){
		return createAuthFromClient(client);
	});
};

module.exports.get=function(authId) {
	if(_.isEmpty(authId))
		return Q.reject(ERRORS.unauthorized);

	return Q.ninvoke(Auth, 'findOne', {_id:authId}).then(function(auth){
		if(!auth)
			return Q.reject(ERRORS.unauthorized);

		Auth.update({_id: auth._id}, {lastLogin: new Date()});

		return auth;
	});
};
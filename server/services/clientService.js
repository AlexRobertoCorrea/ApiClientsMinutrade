/**
 * Created by alex on 19/04/16.
 */
var Client = require('../models/client');
var baseService = require('./baseService');

module.exports.create=function(json) {
	return baseService.create(Client,json).then(function(client) {
		return client;
	});
};

module.exports.get=function(id, populates) {
	return baseService.get(Client, {_id: id}, populates).then(function(client) {
		return client;
	});
};

module.exports.listAndCount=function(params, start,limit, sort, populates) {
	return baseService.listAndCount(Client,params,start,limit, sort, populates);
};

module.exports.update=function(id, json) {
	return baseService.createOrUpdate(Client, {_id: id}, json).then(function(client) {
		return client;
	});
};

module.exports.delete=function(id) {
	return baseService.delete(Client, {_id: id});
};
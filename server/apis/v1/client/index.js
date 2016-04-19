/**
 * Created by alex on 19/04/16.
 */
/**
 * Created by alex on 03/03/15.
 */
var express = require('express');
var _ = require('underscore');
var ERRORS=require('../../../utils/constants').ERRORS;
var clientService=require('../../../services/clientService');

exports = module.exports = this_module;

function this_module(options) {

	var api = express.Router();

	api.route('/')
		.get(function (req, res) {
			var params = {};
			return clientService.listAndCount(params).spread(function(clients, count) {
				res.header('X-List-Total', count).json(clients);
			}, function(err) {
				res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unknown,{original:err&&err.stack||err}));
				console.error('[client/:clientId get] error: ',err&&err.stack||err);
			});
		})
		.post(function(req, res) {
			var json = req.body;
			return clientService.create(json).then(function(client) {
				res.json(client);
			}).catch(function(err) {
				if(err && err.code==11000) {
					var value = err.err&&err.err.match(/: "([^"]+)"/);
					res.status(ERRORS.duplicate_value.httpStatus).json(_.extend({},ERRORS.duplicate_value,{value: value&&value[1]}));
				} else {
					if(err&&err.errors&&err.errors&&err.errors.email&&err.errors.email.message)
						res.status(ERRORS.unknown.httpStatus).json(err.errors.email.message);
					if(err&&err.errors&&err.errors&&err.errors.CPF&&err.errors.CPF.message)
						res.status(ERRORS.unknown.httpStatus).json(err.errors.CPF.message);
					if(err&&err.errors&&err.errors&&err.errors.marital_status&&err.errors.marital_status.message)
						res.status(ERRORS.unknown.httpStatus).json(err.errors.marital_status.message+" The valid values are: 'single', 'married' or 'divorced'");
					if(err&&err.errors&&err.errors&&err.errors.name&&err.errors.name.message)
						res.status(ERRORS.unknown.httpStatus).json(err.errors.name.message);
					else
						res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unknown,{original:err&&err.stack||err}));
					console.error('[client post] error: ',err&&err.stack||err);
				}
			}).done();
		});
	api.route('/:id')
		.get(function (req, res) {
			return clientService.get(req.params.id).then(function(client) {
				res.json(client);
			}, function(err) {
				res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unknown,{original:err&&err.stack||err}));
				console.error('[client/:clientId get] error: ',err&&err.stack||err);
			});
		})
		.put(function (req, res) {
			return clientService.update(req.params.id, req.body).then(function(client){
				res.json(client);
			}, function(err) {
				if(err&&err.errors&&err.errors&&err.errors.email&&err.errors.email.message)
					res.status(ERRORS.unknown.httpStatus).json(err.errors.email.message);
				if(err&&err.errors&&err.errors&&err.errors.CPF&&err.errors.CPF.message)
					res.status(ERRORS.unknown.httpStatus).json(err.errors.CPF.message);
				if(err&&err.errors&&err.errors&&err.errors.marital_status&&err.errors.marital_status.message)
					res.status(ERRORS.unknown.httpStatus).json(err.errors.marital_status.message+" The valid values are: 'single', 'married' or 'divorced'");
				else
					res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unknown,{original:err&&err.stack||err}));
				console.error('[client/:clientId put] error: ',err&&err.stack||err);
			});
		})
		.delete(function (req, res) {
			return clientService.delete(req.params.id).then(function() {
				res.status(204).json("Client successfully deleted.");
			}, function(err) {
				res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unknown,{original:err&&err.stack||err}));
				console.error('[client/:clientId delete] error: ',err&&err.stack||err);
			});
		});

	return api;
}
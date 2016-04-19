/**
 * Created by alex on 19/04/16.
 */
var express    = require('express');

exports = module.exports = this_module;

function this_module(options){

	var appApi = express.Router();

	appApi.use('/client', require('./client')());

	return appApi;
}
/**
 * Created by alex on 19/04/16.
 */
module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		env: {
			options: {
				//Shared Options Hash
			},
			test: {
				NODE_ENV : 'test'
			}
		},

		// Configure a mochaTest task
		mochacli: {
			options: {
				require: ['chai'],
				reporter: ['spec'],
				bail: true
			},
			all: ['spec/api/v1/apiv1_full_spec.js']
		}

	});

	grunt.registerTask('dropdatabase', 'Drop the database', function() {
		// async mode
		var done = this.async();

		var mongoose   = require('mongoose');

		var globoConfig = require('./server/config');
		var uri = globoConfig.get('db:uri');

		console.log('Will drop db \''+uri+'\'...');

		mongoose.connect(uri); // connect to our database

		mongoose.connection.on('open', function () {
			mongoose.connection.db.executeDbCommand({dropAllIndexes: 'api-clients-minutrade-test'},function(err) {
				if(err) {
					console.log(err);
				} else {
					mongoose.connection.db.dropDatabase(function(err) {
						if(err) {
							console.log(err);
						} else {
							console.log('Successfully dropped db \''+uri+'\'');
						}
						mongoose.connection.close(done);
					});
				}
			});
		});
	});

	grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
		this.async();
	});

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});


	grunt.registerTask('test', [
		'env:test',
		'dropdatabase',
		'mochacli'
	]);

};
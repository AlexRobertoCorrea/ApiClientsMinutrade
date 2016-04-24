/**
 * Created by alex on 19/04/16.
 */
var request = require('supertest');
var expect = require('chai').expect;

var global = require('../../../helpers/global-v1');

var clientTeste = global['clientTeste'];

module.exports = function(app) {

	describe('Create, list, put and delete a client', function () {

		this.timeout(50000000);

		var client;

		it('[teste]\t POST /api/v1/client', function (done) {

			request(app)
				.post('/api/v1/client')
				.send(clientTeste)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						var json = res.body;
                        //console.log(JSON.stringify(json, null, 3));

						expect(json).to.be.a('object');
						expect(json.createdAt).to.be.a('string');
						expect(json.updatedAt).to.be.a('string');
						expect(json.id).to.be.a('string');
						expect(json.name).to.be.a('string');
						expect(json.surname).to.be.a('string');
						expect(json.email).to.be.a('string');
						expect(json.CPF).to.be.a('string');
						expect(json.address).to.be.a('string');
						expect(json.marital_status).to.be.a('string');
						expect(json.phone_number).to.be.a('array');
						expect(json.phone_number[0]).to.be.a('string');

						expect(json.name).to.equal(clientTeste.name);
						expect(json.surname).to.equal(clientTeste.surname);
						expect(json.email).to.equal(clientTeste.email);
						expect(json.CPF).to.equal(clientTeste.CPF);
						expect(json.address).to.equal(clientTeste.address);
						expect(json.marital_status).to.equal(clientTeste.marital_status);
						expect(json.phone_number[0]).to.equal(clientTeste.phone_number[0]);

						client = json;

						done();
					}
				});
		});

		it('[teste]\t GET /api/v1/client', function (done) {

			request(app)
				.get('/api/v1/client')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						var json = res.body;
//                        console.log(JSON.stringify(json, null, 3));

						expect(json).to.be.a('array');
						expect(json[0].createdAt).to.be.a('string');
						expect(json[0].updatedAt).to.be.a('string');
						expect(json[0].id).to.be.a('string');
						expect(json[0].name).to.be.a('string');
						expect(json[0].surname).to.be.a('string');
						expect(json[0].email).to.be.a('string');
						expect(json[0].CPF).to.be.a('string');
						expect(json[0].address).to.be.a('string');
						expect(json[0].marital_status).to.be.a('string');
						expect(json[0].phone_number).to.be.a('array');
						expect(json[0].phone_number[0]).to.be.a('string');

						expect(json[0].name).to.equal(clientTeste.name);
						expect(json[0].surname).to.equal(clientTeste.surname);
						expect(json[0].email).to.equal(clientTeste.email);
						expect(json[0].CPF).to.equal(clientTeste.CPF);
						expect(json[0].address).to.equal(clientTeste.address);
						expect(json[0].marital_status).to.equal(clientTeste.marital_status);
						expect(json[0].phone_number[0]).to.equal(clientTeste.phone_number[0]);

						done();
					}
				});
		});

		it('[teste]\t GET /api/v1/client/:id', function (done) {

			request(app)
				.get('/api/v1/client/'+client.id)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						var json = res.body;
//                        console.log(JSON.stringify(json, null, 3));

						expect(json).to.be.a('object');
						expect(json.createdAt).to.be.a('string');
						expect(json.updatedAt).to.be.a('string');
						expect(json.id).to.be.a('string');
						expect(json.name).to.be.a('string');
						expect(json.surname).to.be.a('string');
						expect(json.email).to.be.a('string');
						expect(json.CPF).to.be.a('string');
						expect(json.address).to.be.a('string');
						expect(json.marital_status).to.be.a('string');
						expect(json.phone_number).to.be.a('array');
						expect(json.phone_number[0]).to.be.a('string');

						expect(json.name).to.equal(clientTeste.name);
						expect(json.surname).to.equal(clientTeste.surname);
						expect(json.email).to.equal(clientTeste.email);
						expect(json.CPF).to.equal(clientTeste.CPF);
						expect(json.address).to.equal(clientTeste.address);
						expect(json.marital_status).to.equal(clientTeste.marital_status);
						expect(json.phone_number[0]).to.equal(clientTeste.phone_number[0]);

						done();
					}
				});
		});

		it('[teste]\t PUT /api/v1/client/:id', function (done) {

			clientTeste.name = 'test2';

			request(app)
				.put('/api/v1/client/'+client.id)
				.send({
					name: 'test2'
				})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						var json = res.body;
//                        console.log(JSON.stringify(json, null, 3));

						expect(json).to.be.a('object');
						expect(json.createdAt).to.be.a('string');
						expect(json.updatedAt).to.be.a('string');
						expect(json.id).to.be.a('string');
						expect(json.name).to.be.a('string');
						expect(json.surname).to.be.a('string');
						expect(json.email).to.be.a('string');
						expect(json.CPF).to.be.a('string');
						expect(json.address).to.be.a('string');
						expect(json.marital_status).to.be.a('string');
						expect(json.phone_number).to.be.a('array');
						expect(json.phone_number[0]).to.be.a('string');

						expect(json.name).to.equal(clientTeste.name);
						expect(json.surname).to.equal(clientTeste.surname);
						expect(json.email).to.equal(clientTeste.email);
						expect(json.CPF).to.equal(clientTeste.CPF);
						expect(json.address).to.equal(clientTeste.address);
						expect(json.marital_status).to.equal(clientTeste.marital_status);
						expect(json.phone_number[0]).to.equal(clientTeste.phone_number[0]);

						done();
					}
				});
		});

		it('[teste]\t DELETE /api/v1/client/:id', function (done) {

			request(app)
				.delete('/api/v1/client/'+client.id)
				.expect(204)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						done();
					}
				});
		});
	})
};
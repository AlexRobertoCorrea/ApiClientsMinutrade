/**
 * Created by alex on 22/04/16.
 */
var request = require('supertest');
var expect = require('chai').expect;
var global = require('../../../helpers/global-v1');

var clientTeste2 = global['clientTeste2'];

module.exports = function(app){

	describe('Authentication', function () {

		this.timeout(50000);

		var client;

		it('[teste]\t POST /api/v1/client', function (done) {

			request(app)
				.post('/api/v1/client')
				.send(clientTeste2)
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

						expect(json.name).to.equal(clientTeste2.name);
						expect(json.surname).to.equal(clientTeste2.surname);
						expect(json.email).to.equal(clientTeste2.email);
						expect(json.CPF).to.equal(clientTeste2.CPF);
						expect(json.address).to.equal(clientTeste2.address);
						expect(json.marital_status).to.equal(clientTeste2.marital_status);
						expect(json.phone_number[0]).to.equal(clientTeste2.phone_number[0]);

						client = json;

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

						expect(json.name).to.equal(clientTeste2.name);
						expect(json.surname).to.equal(clientTeste2.surname);
						expect(json.email).to.equal(clientTeste2.email);
						expect(json.CPF).to.equal(clientTeste2.CPF);
						expect(json.address).to.equal(clientTeste2.address);
						expect(json.marital_status).to.equal(clientTeste2.marital_status);
						expect(json.phone_number[0]).to.equal(clientTeste2.phone_number[0]);

						client = json;

						done();
					}
				});
		});

		it('[teste]\t POST /api/v1/auth/login', function (done) {

			request(app)
				.post('/api/v1/auth/login')
				.send({
					email    : client.email,
					password : clientTeste2.password
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

						expect(json.client).to.be.a('object');
						expect(json.createdAt).to.be.a('string');
						expect(json.updatedAt).to.be.a('string');
						expect(json.client.id).to.be.a('string');
						expect(json.client.name).to.be.a('string');
						expect(json.client.surname).to.be.a('string');
						expect(json.client.email).to.be.a('string');
						expect(json.client.CPF).to.be.a('string');
						expect(json.client.address).to.be.a('string');
						expect(json.client.marital_status).to.be.a('string');
						expect(json.client.phone_number).to.be.a('array');
						expect(json.client.phone_number[0]).to.be.a('string');

						expect(json.client.name).to.equal(clientTeste2.name);
						expect(json.client.surname).to.equal(clientTeste2.surname);
						expect(json.client.email).to.equal(clientTeste2.email);
						expect(json.client.CPF).to.equal(clientTeste2.CPF);
						expect(json.client.address).to.equal(clientTeste2.address);
						expect(json.client.marital_status).to.equal(clientTeste2.marital_status);
						expect(json.client.phone_number[0]).to.equal(clientTeste2.phone_number[0]);
						expect(json.client.id).to.equal(client.id);

						done();
					}
				})

		});

	});

};
/**
 * Created by alex on 19/04/16.
 */
var expect = require('chai').expect;

var helpers = require('../../../helpers/../../server/utils/helpers');

var global = require('../../../helpers/global-v1');

module.exports = function() {
	describe('Test CPF, email and phone numbers validity', function () {
		this.timeout(50000000);

		it('[teste]\t Verify CPF with correct value', function (done) {
			expect(helpers.verifyCPF('13926785527')).to.be.a('boolean');

			expect(helpers.verifyCPF('13926785527')).to.equal(true);

			done();
		});

		it('[teste]\t Verify CPF with wrong value', function (done) {
			expect(helpers.verifyCPF('1392678552')).to.be.a('boolean');

			expect(helpers.verifyCPF('1392678552')).to.equal(false);

			done();
		});

		it('[teste]\t Verify phone number that starts with 9 with correct value', function (done) {
			expect(helpers.verifyPhoneNumber(['31933334444'])).to.be.a('boolean');

			expect(helpers.verifyPhoneNumber(['31933334444'])).to.equal(true);

			done();
		});

		it('[teste]\t Verify phone number that starts with 9 with wrong value', function (done) {
			expect(helpers.verifyPhoneNumber(['3193333444'])).to.be.a('boolean');

			expect(helpers.verifyPhoneNumber(['3193333444'])).to.equal(false);

			done();
		});

		it('[teste]\t Verify phone number that doesn\'t start with 9 with correct value', function (done) {
			expect(helpers.verifyPhoneNumber(['3133334444'])).to.be.a('boolean');

			expect(helpers.verifyPhoneNumber(['3133334444'])).to.equal(true);

			done();
		});

		it('[teste]\t Verify phone number that doesn\'t start with 9 with wrong value', function (done) {
			expect(helpers.verifyPhoneNumber(['313333444'])).to.be.a('boolean');

			expect(helpers.verifyPhoneNumber(['313333444'])).to.equal(false);

			done();
		});

		it('[teste]\t Verify email with correct value', function (done) {
			expect(helpers.verifyEmail('test@test.com')).to.be.a('boolean');

			expect(helpers.verifyEmail('test@test.com')).to.equal(true);

			done();
		});

		it('[teste]\t Verify email with wrong value', function (done) {
			expect(helpers.verifyEmail('test')).to.be.a('boolean');

			expect(helpers.verifyEmail('test')).to.equal(false);

			done();
		});

		it('[teste]\t Verify email with wrong value', function (done) {
			expect(helpers.verifyEmail('test@test')).to.be.a('boolean');

			expect(helpers.verifyEmail('test@test')).to.equal(false);

			done();
		});

	});
};
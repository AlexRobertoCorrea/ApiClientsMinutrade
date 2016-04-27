/**
 * Created by alex on 27/04/16.
 */
var expect = require('chai').expect;

var crypter = require('../../../../server/utils/crypter');

module.exports = function() {
    describe('Verify password encrypted', function () {
        this.timeout(50000000);
        var password = "test";
        var wrong_password = "test2";
        var password_encrypted;

        it('[teste]\t Verify password result after hash', function (done) {
            password_encrypted = crypter.hash(password);
            expect(password_encrypted).to.be.a('String');

            expect(password_encrypted).to.not.equal(password);

            done();
        });

        it('[teste]\t Verify password validity', function (done) {
            expect(crypter.validate(password_encrypted, password)).to.be.a('boolean');

            expect(crypter.validate(password_encrypted, password)).to.equal(true);

            done();
        });

        it('[teste]\t Verify wrong password validity', function (done) {
            expect(crypter.validate(password_encrypted, wrong_password)).to.be.a('boolean');

            expect(crypter.validate(password_encrypted, wrong_password)).to.equal(false);

            done();
        });

    });
};

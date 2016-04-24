/**
 * Created by alex on 22/04/16.
 */
'use strict';

describe('Service: ClientService', function () {
	var ClientService;

	// load the service's module
	beforeEach(module('api-clients-minutrade'));

	beforeEach(inject(function (_ClientService_) {
		ClientService = _ClientService_;
	}));

	it('should do something', function () {
		expect(!!ClientService).toBe(true);
	});

});
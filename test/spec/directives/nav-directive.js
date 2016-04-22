/**
 * Created by alex on 22/04/16.
 */
//'use strict';
describe('Directive: navMenu', function () {
	var $compile,
		$rootScope;

	// load the directive's module
	beforeEach(module('api-clients-minutrade'));

	beforeEach(module('templates/nav-menu/nav-menu.html'));
	beforeEach(module('templates/auth/login.html'));

	beforeEach(inject(function (_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('Replaces the element with the appropriate content', inject(function ($compile) {
		var element = $compile("<nav-menu></nav-menu>")($rootScope);
		$rootScope.$digest();
		expect(element.html()).toContain('Sign out');
	}));
});
/**
 * Created by alex on 22/04/16.
 */
describe('ClientCtrl', function() {
	beforeEach(module('api-clients-minutrade'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	//describe('$scope.addPhoneNumber', function() {
	//	it('Add an element in phone_numbers', function() {
	//		var $scope = {};
	//		var controller = $controller('ClientCtrl', { $scope: $scope });
	//		console.log($controller)
	//		$scope.phone_numbers = [''];
	//		expect($scope.phone_numbers.length).toEqual(1);
	//		$scope.addPhoneNumber();
	//		expect($scope.phone_numbers.length).toEqual(2);
	//	});
	//});

	//describe('$scope.removePhoneNumber', function() {
	//	it('Delete an element in phone_numbers', function() {
	//		var $scope = {};
	//		var controller = $controller('ClientCtrl', { $scope: $scope });
	//		$scope.phone_numbers = [''];
	//		expect($scope.phone_numbers.length).toEqual(1);
	//		$scope.addPhoneNumber();
	//		expect($scope.phone_numbers.length).toEqual(2);
	//		$scope.removePhoneNumber();
	//		expect($scope.phone_numbers.length).toEqual(1);
	//	});
	//});
	//
	//describe('$scope.close', function() {
	//	it('Cancel the alert', function() {
	//		var $scope = {};
	//		var controller = $controller('ClientCtrl', { $scope: $scope });
	//		$scope.alert = {};
	//		$scope.close();
	//		expect($scope.alert).toEqual(undefined);
	//	});
	//});
});
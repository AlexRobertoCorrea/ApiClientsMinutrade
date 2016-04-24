/**
 * Created by alex on 21/04/16.
 */
'use strict';

angular.module('api-clients-minutrade')
	.controller('ClientListCtrl', ['$scope','$rootScope','$state','$stateParams','ClientService',
		function ($scope,$rootScope,$state,$stateParams,ClientService) {
			$scope.searchQuery = "";
			//paginação
			$scope.limit = 15;
			$scope.start = 0;
			$scope.currentPage = 1;

			$scope.main = function() {
				_getClient();
			};

			function _getClient() {
				ClientService.list({name: $scope.searchQuery})
					.then(function(res) {
						$scope.total = res.headers()['x-list-total'] || 1;
						$scope.pageNumber = Math.ceil(res.headers()['x-list-total'] / $scope.limit) || 1;
						$scope.clients = Array.isArray(res.data) ? res.data : [res.data];
						$scope.clients = _.map($scope.clients, function(client){
							client.completeName = (client.surname ? client.name+' '+client.surname : client.name).toLowerCase();
							client.phone_numbers = client.phone_number.join(" / ");
							return client;
						});
						$scope.clients = _.sortBy($scope.clients, 'completeName');
					}, function() {

					});
			}

			$scope.deleteUser = function(client) {
				ClientService.deleteClient(client.id)
					.then(function(res) {
						_getClient();
						$scope.alert = {type: 'success', msg: "Client "+client.surname ? client.name+' '+client.surname : client.name+" was successfully deleted."};
						$("body, html").animate({scrollTop: 0}, "normal");
					}, function() {
						$scope.alert = {type: 'danger', msg: "Could not delete the client " +client.surname ? client.name+' '+client.surname : client.name+". Try again later."};
						$("body, html").animate({scrollTop: 0}, "normal");
					});
			};

			$scope.search = function() {
				_getClient();
			};

			$scope.close = function() {
				delete $scope.alert;
			};

			$scope.prevPage = function() {
				if ($scope.currentPage > 1) {
					$scope.currentPage = $scope.currentPage - 1;
					$scope.start = ($scope.currentPage - 1) * $scope.limit;
					$scope.selectedAll = false;
					$scope.marginleft = '';
					_getClient();
				}
			};
			$scope.nextPage = function() {
				if ($scope.currentPage < $scope.pageNumber) {
					$scope.currentPage = $scope.currentPage + 1;
					$scope.start = ($scope.currentPage - 1) * $scope.limit;
					$scope.selectedAll = false;
					$scope.marginleft = '';
					_getClient();
				}
			};

		}]);
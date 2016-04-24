/**
 * Created by alex on 21/04/16.
 */
'use strict';

angular.module('api-clients-minutrade')
	.controller('ClientCtrl', ['$scope','$state','$stateParams','client','ClientService',
		function ($scope,$state,$stateParams,client,ClientService) {
			$scope.edit = $stateParams.saved;
			$scope.client = client||{};
			$scope.phone_numbers = $scope.client.phone_number||[''];
			$scope.marital_statuses = [
				{
					id: 'single',
					data: 'Single'
				},
				{
					id: 'married',
					data: 'Married'
				},
				{
					id: 'divorced',
					data: 'Divorced'
				}
			];
			$scope.selectedMaritalStatus = _.find($scope.marital_statuses,function(marital_status){return marital_status.id==$scope.client.marital_status;})||'';
			$scope.alert=false;
			$scope.saving = false;

			$scope.save = function() {
				$scope.saving = true;
				if($scope.client.email!=$scope.client.emailConfirm)
				{
					$scope.alert={prefix: 'Ops!', text:'The emails aren\'t the same.',type:'alert alert-danger'};
					$("body, html").animate({scrollTop: 0}, "normal");
				}
				else {
					$scope.client.marital_status = $scope.selectedMaritalStatus.id;
					$scope.client.phone_number = $scope.phone_numbers;

					if ($scope.edit && $scope.client.id || $scope.client.id) {
						ClientService.put($scope.client.id, $scope.client)
								.then(function (res) {
									_successMessage(" was successfully updated!");
								})
								.catch(function (err) {
									_errorMessage(err);
								});
					}
					else {
						ClientService.createClient($scope.client)
								.then(function (res) {
									_successMessage(" was successfully created!");
								})
								.catch(function (err) {
									_errorMessage(err);
								});
					}
				}
			};

			function _successMessage(message){
				$scope.alert = {
					msg: ($scope.client.surname ? $scope.client.name + " " + $scope.client.surname : $scope.client.name) + message,
					type: 'alert alert-success'
				};
				$scope.saving = false;
			}

			function _errorMessage(err){
				$scope.saving = false;
				if (err[0].httpStatus == 401) {
					var value = '';
					if (err[0].value == $scope.client.CPF)
						value = 'CPF';
					else if (err[0].value == $scope.client.email)
						value = 'e-mail';
					$scope.alert = {
						msg: 'This ' + value + ' already exists. Please, try another ' + value + '.',
						type: 'alert alert-danger'
					};
					$("body, html").animate({scrollTop: 0}, "normal");
				}
				else if (err[1] == 403) {
					if (err[0] == 'Invalid CPF')
						$scope.alert = {
							msg: 'Invalid CPF. Please, type the correct CPF.',
							type: 'alert alert-danger'
						};
					else if (err[0] == 'Invalid phone number')
						$scope.alert = {
							msg: 'Invalid phone number. Please, type the correct phone number.',
							type: 'alert alert-danger'
						};
					else if (err[0] == 'Invalid email')
						$scope.alert = {
							msg: 'Invalid email. Please, type the correct email.',
							type: 'alert alert-danger'
						};
					$("body, html").animate({scrollTop: 0}, "normal");
				}
				else {
					$scope.alert = {
						msg: 'It wasn\'t possible save data. Please, try again later.',
						type: 'alert alert-danger'
					};
					$("body, html").animate({scrollTop: 0}, "normal");
				}
			}

			$scope.close = function() {
				delete $scope.alert;
			};

			$scope.addPhoneNumber = function () {
				$scope.phone_numbers.push('');
			};

			$scope.removePhoneNumber = function(index) {
				$scope.phone_numbers.splice(index,1);
			};

		}]);
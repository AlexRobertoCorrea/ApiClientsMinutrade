/**
 * Created by alex on 21/04/16.
 */
'use strict';

angular.module('api-clients-minutrade')
	.controller('LoginCtrl', ['$scope','$rootScope','$state','$stateParams', '$window','AuthService','ClientService',
		function ($scope,$rootScope,$state,$stateParams, $window,AuthService,ClientService) {
			$scope.client = {};
			$scope.phone_numbers = [''];
			$scope.selectedMaritalStatus = '';
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
			$scope.alert=false;
			$scope.saving = false;

			$scope.main = function() {
				AuthService.me().then(function(auth){
					if(!_.isEmpty(auth))
					{
						$scope.auth = auth || false;
						if($scope.auth)
							_getClient($scope.auth.client.id);
					}
				});
			};

			function _getClient(client_id) {
				ClientService.get(client_id)
					.then(function(client){
						$scope.client = client;
					}, function() {
					});
			}

			$scope.login=function(user){
				delete $scope.alert;
				if(!user||!user.email||!user.password)
					$scope.alert={prefix: 'Ops!', text:'Fill the e-mail and password!',type:'alert alert-danger'};
				else {
					delete $scope.alert;
					$scope.loading = true;
					AuthService.login(user.email, user.password)
						.then(function(auth) {
							$state.go('clientlist');
						}, function(res) {
							if (res && res[0] && res[0].code==2)
								$scope.alert={prefix: 'Ops!', text:'That e-mail / password combination is not valid...',type:'alert alert-danger'};
							else
								$scope.alert={prefix: 'Ops!', text:'Unespected error',type:'alert alert-danger'};
							$scope.loading = false;
						});
				}
			};

			$scope.doSignup = function() {
				$scope.saving = true;
				if($scope.client.email!=$scope.client.emailConfirm)
				{
					$scope.alert={prefix: 'Ops!', text:'The emails aren\'t the same.',type:'alert alert-danger'};
					$("body, html").animate({scrollTop: 0}, "normal");
				}
				else
				{
					$scope.client.marital_status = $scope.selectedMaritalStatus.id;
					$scope.client.phone_number = $scope.phone_numbers;

					ClientService.createClient($scope.client)
						.then(function(res) {
							$scope.alert={text:($scope.client.surname?$scope.client.name + " " + $scope.client.surname:$scope.client.name)+" was successfully created!",type:'alert alert-success'};
							$scope.saving = false;
						})
						.catch(function(err){
							$scope.saving = false;
							if(err[0].httpStatus==401)
							{
								var value = '';
								if(err[0].value==$scope.client.CPF)
									value = 'CPF';
								else if(err[0].value==$scope.client.email)
									value = 'e-mail';
								$scope.alert={prefix: 'Ops!', text:'This '+value+' already exists. Please, try another '+value+'.',type:'alert alert-danger'};
								$("body, html").animate({scrollTop: 0}, "normal");
							}
							else if(err[1]==403)
							{
								if(err[0]=='Invalid CPF')
									$scope.alert={prefix: 'Ops!', text:'Invalid CPF. Please, type the correct CPF.',type:'alert alert-danger'};
								else if(err[0]=='Invalid phone number')
									$scope.alert={prefix: 'Ops!', text:'Invalid phone number. Please, type the correct phone number.',type:'alert alert-danger'};
								else if(err[0]=='Invalid email')
									$scope.alert={prefix: 'Ops!', text:'Invalid email. Please, type the correct email.',type:'alert alert-danger'};
								$("body, html").animate({scrollTop: 0}, "normal");
							}
							else
							{
								$scope.alert={prefix: 'Ops!', text:'It wasn\'t possible save data. Please, try again later.',type:'alert alert-danger'};
								$("body, html").animate({scrollTop: 0}, "normal");
							}
						});
				}
			};

			$scope.addPhoneNumber = function () {
				$scope.phone_numbers.push('');
			};

			$scope.removePhoneNumber = function(index) {
				$scope.phone_numbers.splice(index,1);
			};

			$scope.close = function(){
				$scope.alert = false;
			};

		}]);

/**
 * Created by alex on 21/04/16.
 */
angular.module('api-clients-minutrade')
	.directive('navMenu', ['$stateParams', function ($stateParams) {
		return {
			templateUrl: 'templates/nav-menu/nav-menu.html',
			scope: true,
			replace: true,
			restrict: 'E',
			controller: ['$scope','$state','$stateParams','$rootScope','AuthService',
				function($scope,$state,$stateParams,$rootScope,AuthService) {
					$scope.status = {
						isopen: false
					};
					AuthService.me()
							.then(function(auth){
								$scope.auth = auth || false;
							}, function() {
							});

					if($state.current.controller == 'ClientListCtrl' || $state.current.controller == 'ClientCtrl')
					{
						$scope.leftTab = 'Search users';
						$scope.rightTab = $stateParams.saved ? 'Edit user': 'Add user';
					}
					if($state.current.controller == 'ClientListCtrl')
					{
						$scope.leftActive = 'active';
						$scope.rightActive = '';
					}
					else if($state.current.controller == 'ClientCtrl')
					{
						$scope.leftActive = '';
						$scope.rightActive = 'active';
					}

					$scope.nextTab = function() {
						if($state.current.controller == 'ClientListCtrl')
							$state.go('clientnew');
						else if($state.current.controller == 'ClientCtrl')
							$state.go('clientlist');
					}
			}]
		};
	}]);

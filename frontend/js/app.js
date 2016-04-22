/**
 * Created by alex on 20/04/16.
 */
'use strict';

angular.module('api-clients-minutrade', [
	'ngRoute',
	'ngCookies',
	'ui.router',
	'ui.bootstrap',
	'ngAnimate',
	'ui.utils',
	'ui.mask',
	'angularMoment',
	'seo',
	'slugifier',
	'autocomplete',
	'toastr',
	'ng.deviceDetector',
	'ngSanitize',
	'ui.utils.masks'
]).config(['$stateProvider','$urlRouterProvider','$locationProvider', '$httpProvider',
	function($stateProvider,$urlRouterProvider,$locationProvider, $httpProvider){
		var _getAuth = ['AuthService', '$state', '$rootScope', function (AuthService, $state, $rootScope) {
			return AuthService.me().then(function(auth){
				$rootScope.auth=auth;
				return auth;
			},function () {
				delete $rootScope.auth;
				$state.go('login');
			});
		}];


		$stateProvider
			.state('login', {
				url: '/signin',
				templateUrl: 'templates/auth/login.html',
				controller: 'LoginCtrl'
			})
			.state('signup', {
				url: '/register',
				templateUrl: 'templates/auth/signup.html',
				controller: 'LoginCtrl'
			})
			.state('clientnew', {
				url:'/client',
				templateUrl: 'templates/client/client.html',
				controller: 'ClientCtrl',
				resolve: {
					auth: _getAuth,
					client: _.noop
				}
			})
			.state('clientedit', {
				url:'/client/:id?saved',
				templateUrl: 'templates/client/client.html',
				controller: 'ClientCtrl',
				resolve: {
					auth: _getAuth,
					client: ['ClientService','$stateParams', function(ClientService, $stateParams){
						if($stateParams.id) {
							return ClientService.get($stateParams.id).then(function(client){
								return client;
							}, function(err){
								console.log(err);
							});
						}
					}]
				}
			})
			.state('clientlist', {
				url:'/clients',
				templateUrl: 'templates/client/clientlist.html',
				controller: 'ClientListCtrl',
				resolve: {
					auth: _getAuth
				}
			})
		;

		// use the HTML5 History API
		$locationProvider.html5Mode(true);

		//Configurando interceptor para todas requisicoes http
		$httpProvider.interceptors.push('HttpInterceptor');

		$urlRouterProvider.otherwise('/signin');
	}]).run(['$rootScope','$q','amMoment','AuthService','$state','$window','$location','$route',
	function($rootScope,$q,amMoment,AuthService,$state,$window,$location,$route) {
		$q.resolve=function(val){
			var d=$q.defer();
			d.resolve(val);
			return d.promise;
		};

		var original = $location.path;
		$location.path = function (path, reload) {
			if (reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function () {
					$route.current = lastRoute;
					un();
				});
			}
			return original.apply($location, [path]);
		};

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			$window.scrollTo(0, 0);
			$rootScope.lastState = fromState;
			$rootScope.lastStateParams = fromParams;

			if(!AuthService.exists && toState.name.indexOf('login') == -1)
				$state.go('login');
		});

		$rootScope.doLogout=function() {
			AuthService.logout();
			delete $rootScope.auth;
			$window.location.host = $window.location.host; //ao deslogar, vai para a página inicial
		};

	}]);

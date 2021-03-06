/**
 * Created by alex on 20/04/16.
 */
angular.module('api-clients-minutrade')
	.factory('AuthService', ['$q','$http','$window','$state', function($q, $http, $window,$state){
		var baseEndpoint='/api/v1/auth';
		var _auth=null;

		function storeAuth(auth) {
			_auth = auth;
			$window.localStorage.authId=auth.id;
		}
		function getAuthId() {
			try {
				return $window.localStorage.authId;
			} catch(e) {}
		}

		function login(email, password) {
			return $http.post(baseEndpoint+'/login', {email:email,password:password}).then(function(res){
				storeAuth(res.data);
				return res.data;
			}, function(res){
				return $q.reject([res.data, res.status]);
			});
		}

		function logout() {
			$window.localStorage.clear();
			_auth=null;
			$state.go('login');
		}

		function exists() {
			return _auth != null;
		}

		var _mePromise;
		function me() {
			if(_auth)
				return $q.resolve(_auth);

			if (_mePromise)
				return _mePromise;

			var authId = getAuthId();
			if(!authId)
				return $q.reject([]);

			var d = $q.defer();
			$http.get('/api/v1/me', {headers:{'x-auth':authId}}).then(function(res){
				storeAuth(res.data);
				d.resolve(res.data);
				_mePromise=null;
			}, function(res){
				d.reject([res.data, res.status]);
				_mePromise=null;
			});

			return (_mePromise = d.promise);
		}


		return {
			login:login,
			logout:logout,
			getAuthId:getAuthId,
			me:me,
			exists:exists()
		};
	}]);

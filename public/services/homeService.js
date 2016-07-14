angular.module('Deed')
	.service('homeService', function ($http) {
	
		// createUser creates a new user account
		this.createNewUser = function (newUser) {
			return $http.put('/api/user/signup', newUser)
		}

		// createNewUser logs an user into his/her account
		this.login = function (user) {
			return $http.put('/api/user/login', user);
		}

		this.startSession = function () {
			return $http.post('/api/startSession');
		}


// end of homeService		
	})
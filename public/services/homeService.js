angular.module('Deed')
	.service('homeService', function ($http) {
		
		// createUser creates a new user account
		this.createNewUser = function (newUser) {
			return $http.post('/api/user/signup', newUser)
		}

		// createNewUser logs an user into his/her account
		this.login = function (user) {
			return $http.post('/api/user/login', user);
		}




// end of homeService		
	})
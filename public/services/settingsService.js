angular.module('Deed')
	.service('settingsService', function ($http) {
		this.fillForm = function () {
			return $http.get('/api/user/getProfile');
		}

		this.updateProfile = function (update) {
			return $http.put('/api/user/updateProfile', update)
		}


// end of settingsService	
	})
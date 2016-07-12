angular.module('Deed')
	.service('settingsService', function ($http) {
		this.fillForm = function () {
			return $http.get('/api/user/getProfile');
		}


// end of settingsService	
	})
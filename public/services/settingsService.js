angular.module('Deed')
	.service('settingsService', function ($http) {

		this.fillForm = function (userId) {
			return $http.put('/api/user/getProfile', {
				_id: userId
			});
		}

		this.updateProfile = function (update) {
			return $http.put('/api/user/updateProfile', update);
		}


// end of settingsService	
	})
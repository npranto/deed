angular.module('Deed')
	.service('userProfileService', function ($http) {
		
		this.getProfile = function () {
			return $http.get('/api/user/getProfile')
				.then((response)=>{
					return response;
				})
		};

		this.logout = function () {
			return $http.post('/api/user/logout');
		};

		// this.postDeed = function (deedContent, userId) {
		// 	return $http.post('/api/user/postDeed', {
		// 		author: userId,
		// 		textContent: deedContent
		// 	});	
		// };

		
// end of userProfileService
	})
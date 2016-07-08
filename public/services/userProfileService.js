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

		this.postDeed = function (deed, userId) {
			return $http.post('/api/user/postDeed', {
				author: userId,
				textContent: deed.textContent
			})
		};

		this.getiDeeds = function (userId) {
			return $http.get('/api/user/iDeeds', {
				_id: userId
			})
		};

		this.getFeeds = function () {
			return $http.get('/api/user/feeds')
		};

		this.makeFavorite = function (deedId) {
			return $http.post('/api/deed/makeFavorite', {
				_id: deedId
			})
		};

		this.getFavorites = function () {
			return $http.get('/api/user/favorites');
		}










		
// end of userProfileService
	})
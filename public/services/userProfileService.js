angular.module('Deed')
	.service('userProfileService', function ($http) {
		
		this.getProfile = function () {
			return $http.get('/api/user/getProfile')
				.then((response)=>{
					console.log(response);
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

		this.getFollowing = function () {
			return $http.get('/api/user/following');
		}
		this.getFollowers = function () {
			return $http.get('/api/user/followers');
		}

		this.getFeeds = function () {
			return $http.get('/api/user/feeds')
		};

		this.makeFavorite = function (deedId) {
			return $http.put('/api/deed/makeFavorite', {
				_id: deedId
			})
		};

		this.getFavorites = function () {
			return $http.get('/api/user/favorites');
		};

		this.likePost = function (deedId) {
			console.log(deedId);
			return $http.put('/api/deed/likePost', {
				_id: deedId
			})
		};

		this.lovePost = function (deedId) {
			return $http.put('/api/deed/lovePost', {
				_id: deedId
			});
		};

		this.sobPost = function (deedId) {
			return $http.put('/api/deed/sobPost', {
				_id: deedId
			});
		};

		this.searchUsers = function (fName) {
			console.log("FIRSTNAME", fName);
			return $http.put('/api/searchUsers', {
				firstName: fName
			});
		};

		this.follow = function (userId) {
			console.log("FOLLOW USERID", userId)
			return $http.post('/api/user/follow', {
				_id: userId
			})
		};

		this.deleteFavorite = function (favoriteId) {
			return $http.put('/api/user/deleteFavoriteDeed',{
				_id: favoriteId
			})
		}

		









		
// end of userProfileService
	})
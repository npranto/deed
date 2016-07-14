angular.module('Deed')
	.service('userProfileService', function ($http) {
		
		this.getProfile = function (userId) {
			return $http.put('/api/user/getProfile',{
				_id: userId
			})
		};

		this.getMoment = function () {
			return $http.get('/api/deed/getMoment');
		}

		this.postDeed = function (deed, userId) {
			return $http.post('/api/user/postDeed', {
				author: userId,
				textContent: deed.textContent,
				photoContent: deed.photoContent
			})
		};

		this.getiDeeds = function (userId) {
			return $http.put('/api/user/iDeeds', {
				_id: userId
			})
		};

		this.getFollowing = function (userId) {
			return $http.put('/api/user/following', {
				_id: userId
			});
		}
		this.getFollowers = function (userId) {
			return $http.put('/api/user/followers', {
				_id: userId
			});
		}

		this.getFeeds = function () {
			return $http.get('/api/user/feeds')
		};

		this.makeFavorite = function (deedId, userEmail) {
			console.log(userEmail);
			return $http.put('/api/deed/makeFavorite', {
				_id: deedId,
				email: userEmail
			})
		};

		this.getFavorites = function (userId) {
			return $http.put('/api/user/favorites', {
				_id: userId
			});
		};

		this.likePost = function (deedId, userEmail) {
			console.log(deedId);
			return $http.put('/api/deed/likePost', {
				_id: deedId,
				email: userEmail
			})
		};

		this.lovePost = function (deedId, userEmail) {
			return $http.put('/api/deed/lovePost', {
				_id: deedId,
				email: userEmail
			});
		};

		this.sobPost = function (deedId, userEmail) {
			return $http.put('/api/deed/sobPost', {
				_id: deedId,
				email: userEmail
			});
		};

		this.searchUsers = function (fName) {
			console.log("FIRSTNAME", fName);
			return $http.put('/api/searchUsers', {
				firstName: fName
			});
		};

		this.follow = function (searchUserId, userEmail) {
			// console.log("FOLLOW USERID", searchUserId)
			return $http.put('/api/user/follow', {
				_id: searchUserId,
				email: userEmail
			})
		};

		this.deleteFavorite = function (favoriteId, userEmail) {
			return $http.put('/api/user/deleteFavoriteDeed',{
				_id: favoriteId,
				email: userEmail
			})
		}

		









		
// end of userProfileService
	})
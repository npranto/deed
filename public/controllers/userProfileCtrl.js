angular.module('Deed')
	.controller('userProfileCtrl', function ($scope, userProfileService, $state, $cookies) {
		
		let userId;
		$scope.showPictures = false;

		let getProfile = function () {
			var userLoggedInId = $cookies.getObject('userLoggedIn');
			console.log(">>>>>>>>>>", userLoggedInId);
			$scope.profile = userLoggedInId;
		};

		$scope.logout = function () {
			// userProfileService.logout()
			// .then((response)=>{
			console.log("BEFORE LOGOUT", $cookies.getObject('userLoggedIn'));
			$cookies.remove('userLoggedIn');
			$state.go("home");	
			// })
			
		};

		$scope.getFeeds = function () {
			userProfileService.getFeeds()
			.then((response)=>{
				console.log(response);
				$scope.feeds = response.data.reverse();
			})

		};

		$scope.getiDeeds = function (userId) {
			userProfileService.getiDeeds(userId)
			.then((response)=>{
				console.log(response);
				$scope.deeds = response.data.iDeeds.reverse();
				$scope.author = response.data.firstName + " " + response.data.lastName;
				$scope.picture = response.data.picture;
			})
		};

		$scope.getFollowing = function () {
			userProfileService.getFollowing()
			.then((response)=>{
				console.log(response);
				$scope.following = response.data.following;
			});
		};

		$scope.getFollowers = function () {
			userProfileService.getFollowers()
			.then((response)=>{
				console.log(response);
				$scope.followers = response.data.followers;
			});
		};

		$scope.postDeed = function (deed) {
			userProfileService.postDeed(deed, userId)
			.then((response)=>{
				console.log(response);
				$scope.deed.textContent = "";
				$scope.getFeeds();
				$scope.getiDeeds(userId);
				$scope.getProfile();

			})
		};

		$scope.makeFavorite = function (deedId) {
			console.log(deedId);
			userProfileService.makeFavorite(deedId)
			.then((response)=>{
				$scope.getFeeds();
				$scope.getProfile();
			})
		};

		$scope.getFavorites = function () {
			userProfileService.getFavorites()
			.then((response)=>{
				console.log(response);
				$scope.favorites = response.data.favorites.reverse();
			})
		};

		$scope.likePost = function (deedId) {
			console.log("deedId", deedId);
			userProfileService.likePost(deedId)
			.then((response)=>{
				$scope.getFeeds();
			})
		};

		$scope.lovePost = function (deedId) {
			userProfileService.lovePost(deedId)
			.then((response)=>{
				console.log(response);
				$scope.getFeeds();
			})
		};

		$scope.sobPost = function (deedId) {
			userProfileService.sobPost(deedId)
			.then((response)=>{
				console.log(response);
				$scope.getFeeds();
			})
		};

		$scope.searchUsers = function (name) {
			let fName = name.trim();
			let firstName = fName.charAt(0).toUpperCase() + fName.slice(1);
			console.log("FIRSTNAME",firstName);
			userProfileService.searchUsers(firstName)
			.then((response)=>{
				$scope.users = response.data;
			})
		}

		$scope.follow = function (userId) {
			console.log("FOLLOW USERID", userId)
			userProfileService.follow(userId)
			.then((response)=>{
				console.log(response);
				$scope.getProfile();
			})
		}

		$scope.deleteFavorite = function(favoriteId){
			userProfileService.deleteFavorite(favoriteId)
			.then((response)=>{
				$scope.getFavorites();
				$scope.getProfile();
			})
		};

		$scope.onSuccess = function (Blob){
			console.log(Blob.url);
			$scope.pictureUrl = Blob.url;
			$scope.showPictures = true;
    	};



    	
        getProfile();
        
		
		





// end of userProfileCtrl	
	})
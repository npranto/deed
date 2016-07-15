angular.module('Deed')
	.controller('userProfileCtrl', function ($scope, userProfileService, $state, $cookies) {
		
		let userId;
		let userEmail;
		$scope.showPicture = false;
		$scope.showMoment = true;
		$scope.showPhotoContent = false;

		let getProfile = function () {
			var userLoggedInId = $cookies.getObject('userLoggedIn');
			userId = userLoggedInId._id;
			userEmail = userLoggedInId.email;
			userProfileService.getProfile(userId)
			.then((response)=>{
				console.log(response);
				$scope.profile = response.data;
			})
			
		};

		let getMoment = function () {
			userProfileService.getMoment()
			.then((response)=>{
				console.log(response);
				$scope.moment = response.data;
			})
		}

		$scope.switchToHomeFeed = function () {
			$scope.showMoment = false;
		}

		$scope.logout = function () {
			$cookies.remove('userLoggedIn');
			$state.go("home");				
		};

		$scope.getFeeds = function () {
			userProfileService.getFeeds()
			.then((response)=>{
				console.log(response);
				$scope.feeds = response.data.reverse();
			})
		};

		$scope.hasPhotoContent = function (model) {
			if (model.photoContent) {
				$scope.showPhotoContent = true;
				return true;
			}
			return false;
		}

		$scope.getiDeeds = function () {
			userProfileService.getiDeeds(userId)
			.then((response)=>{
				console.log(response);
				$scope.deeds = response.data.iDeeds.reverse();
				$scope.author = response.data.firstName + " " + response.data.lastName;
				$scope.picture = response.data.picture;
			})
		};

		$scope.getFollowing = function () {
			userProfileService.getFollowing(userId)
			.then((response)=>{
				console.log(response);
				$scope.following = response.data.following;
			});
		};

		$scope.getFollowers = function () {
			userProfileService.getFollowers(userId)
			.then((response)=>{
				console.log(response);
				$scope.followers = response.data.followers;
			});
		};

		$scope.postDeed = function (deed) {
			console.log(">>>>>>>>>>", deed);
			userProfileService.postDeed(deed, userId)
			.then((response)=>{
				console.log(response);
				$scope.deed.textContent = "";
				$scope.showPicture = false;
				$scope.getFeeds();
				// $scope.getiDeeds(userId);
				getProfile();

			})
		};

		$scope.makeFavorite = function (deedId) {
			console.log(deedId, userEmail);
			userProfileService.makeFavorite(deedId, userEmail)
			.then((response)=>{
				$scope.getFeeds();
				getProfile();
			})
		};

		$scope.getFavorites = function () {
			userProfileService.getFavorites(userId)
			.then((response)=>{
				console.log(response);
				$scope.favorites = response.data.favorites.reverse();
			})
		};

		$scope.likePost = function (deedId) {
			console.log("deedId", deedId);
			userProfileService.likePost(deedId, userEmail)
			.then((response)=>{
				$scope.getFeeds();
			})
		};

		$scope.lovePost = function (deedId) {
			userProfileService.lovePost(deedId, userEmail)
			.then((response)=>{
				console.log(response);
				$scope.getFeeds();
			})
		};

		$scope.sobPost = function (deedId) {
			userProfileService.sobPost(deedId, userEmail)
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

		$scope.follow = function (searchUserId) {
			// console.log("FOLLOW USERID", searchUserId)
			userProfileService.follow(searchUserId, userEmail)
			.then((response)=>{
				console.log(response);
				getProfile();
			})
		}

		$scope.deleteFavorite = function(favoriteId){
			userProfileService.deleteFavorite(favoriteId, userEmail)
			.then((response)=>{
				$scope.getFavorites();
				getProfile();
			})
		};

		$scope.onSuccess = function (Blob){
			console.log(Blob.url);
			$scope.postPhotoUrl = Blob.url;
			$scope.deed.photoContent = $scope.postPhotoUrl;
			$scope.showPicture = true;
    	};



    	
        getProfile();
        getMoment();
        
		
		





// end of userProfileCtrl	
	})
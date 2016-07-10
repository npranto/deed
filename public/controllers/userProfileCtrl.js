angular.module('Deed')
	.controller('userProfileCtrl', function ($scope, userProfileService, $state) {
		
		let userId;

		$scope.getProfile = function () {
			userProfileService.getProfile()
			.then((response)=>{
				console.log(response);	
				$scope.profile = response.data[0];
				// $scope.iDeedsLength = $scope.profile.iDeeds.length;
				// $scope.favoritesLength = $scope.profile.favorites.length;

				console.log($scope.profile);
				userId = $scope.profile._id;

				// $state.go('userProfile');
				console.log(userId);
			})
		};

		$scope.logout = function () {
			userProfileService.logout()
			.then((response)=>{
				$state.go("home");	
			})
			
		};

		$scope.getFeeds = function () {
			userProfileService.getFeeds()
			.then((response)=>{
				console.log(response);
				$scope.feeds = response.data.reverse();
			})

		};

		$scope.iDeeds = function (userId) {
			userProfileService.getiDeeds(userId)
			.then((response)=>{
				console.log(response);
				$scope.deeds = response.data.iDeeds.reverse();
				$scope.author = response.data.firstName + " " + response.data.lastName;
				$scope.picture = response.data.picture;
			})
		};

		$scope.postDeed = function (deed) {
			userProfileService.postDeed(deed, userId)
			.then((response)=>{
				console.log(response);
				$scope.deed.textContent = "";
				$scope.getFeeds();
				$scope.iDeeds(userId);
				$scope.getProfile();

			})
		};

		$scope.makeFavorite = function (deedId) {
			console.log(deedId);
			userProfileService.makeFavorite(deedId)
			.then((response)=>{
				$scope.getFeeds();
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
				console.log(response);
			})
		}

		

		















		$scope.getProfile();
		





// end of userProfileCtrl	
	})
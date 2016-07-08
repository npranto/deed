angular.module('Deed')
	.controller('userProfileCtrl', function ($scope, userProfileService, $state) {
		
		let userId;

		$scope.getProfile = function () {
			userProfileService.getProfile()
			.then((response)=>{	
				$scope.profile = response.data[0];
				console.log($scope.profile);
				userId = $scope.profile._id;
				// $state.go('userProfile.homeFeed');
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
			})
		};

		$scope.postDeed = function (deed) {
			userProfileService.postDeed(deed, userId)
			.then((response)=>{
				console.log(response);
				$scope.deed.textContent = "";
				$scope.getFeeds();
				$scope.iDeeds(userId);
			})
		};

		$scope.makeFavorite = function (deedId) {
			console.log(deedId);
			userProfileService.makeFavorite(deedId)
			.then((response)=>{
				console.log(response);
			})
		};

		$scope.getFavorites = function () {
			userProfileService.getFavorites()
			.then((response)=>{
				console.log(response);
				$scope.favorites = response.data.favorites.reverse();
			})
		}

		

		















		$scope.getProfile();
		





// end of userProfileCtrl	
	})
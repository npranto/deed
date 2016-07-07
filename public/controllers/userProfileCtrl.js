angular.module('Deed')
	.controller('userProfileCtrl', function ($scope, userProfileService, $state) {
		
		let userId;

		$scope.getProfile = function () {
			userProfileService.getProfile()
			.then((response)=>{	
				$scope.profile = response.data[0];
				console.log($scope.profile);
				userId = $scope.profile._id;
				console.log(userId);
			})
		};

		$scope.logout = function () {
			userProfileService.logout()
			.then((response)=>{
				$state.go("home");	
			})
			
		};

		$scope.postDeed = function (deed) {
			userProfileService.postDeed(deed, userId)
			.then((response)=>{
				console.log(response);
				$scope.deed.textContent = "";
				$scope.iDeeds(userId);
			})
		}

		$scope.iDeeds = function (userId) {
			userProfileService.iDeeds(userId)
			.then((response)=>{
				console.log(response);
				$scope.author = response.data.firstName + " " + response.data.lastName;
				$scope.date = response.data.createdAt;
				$scope.deeds = response.data.iDeeds.reverse();

			})
		}













		$scope.getProfile();
		





// end of userProfileCtrl	
	})
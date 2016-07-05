angular.module('Deed')
	.controller('userProfileCtrl', function ($scope, userProfileService, $state) {
		
		$scope.getProfile = function () {
			userProfileService.getProfile()
			.then((response)=>{	
				$scope.profile = response.data[0];
				console.log($scope.profile);
				console.log($scope.profile._id);
			})
		};

		$scope.logout = function () {
			userProfileService.logout()
			.then((response)=>{
				$state.go("home");	
			})
			
		};

		// $scope.postDeed = function (deedContent, userId){
		// 	userProfileService.postDeed(deedContent, userId)
		// 	.then((response)=>{
		// 		console.log(response);
		// 		$scope.deedContent = "";
		// 	})
		// };


		$scope.getProfile();
		






// end of userProfileCtrl	
	})
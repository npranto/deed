angular.module('Deed')
	.controller('settingsCtrl', function ($scope, settingsService) {
		
		$scope.showPicture = true;

		$scope.fillForm = function () {
			settingsService.fillForm()
			.then((response)=>{
				console.log(response);
				$scope.user = response.data[0];
				$scope.pictureUrl = $scope.user.picture;
			})
		}

		$scope.fillForm();


// end of settingsCtrl
	})
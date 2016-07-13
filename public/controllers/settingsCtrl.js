angular.module('Deed')
	.controller('settingsCtrl', function ($scope, settingsService, $state) {
		
		$scope.showInputs = true;
		$scope.hideInputs = false;

		$scope.showPicture = true;
		$scope.changePicture = false;

		$scope.fillForm = function () {
			settingsService.fillForm()
			.then((response)=>{
				console.log(response);
				$scope.user = response.data;
				$scope.pictureUrl = $scope.user.picture;
			})
		}

		$scope.enableEdit = function (argument) {
			$scope.showInputs = false;
			$scope.hideInputs = true;
		}

		$scope.onSuccess = function (Blob) {
			$scope.changePictureUrl = Blob.url;
			$scope.showPicture = false;
			$scope.changePicture = true;

		}

		$scope.updateProfile = function (update) {
			$scope.update.picture = $scope.changePicture;
			if ((update !== undefined) && 
				( update['firstName'] && 
				  update['lastName'] && 
				  update['password'] && 
				  update['favoriteQuote'] &&
				  update['picture']
				) 
			   ){
				settingsService.updateProfile(update)
				.then((response)=>{
					$state.go('userProfile');
				})
			}
		}

		$scope.fillForm();




// end of settingsCtrl
	})
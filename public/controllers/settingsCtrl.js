angular.module('Deed')
	.controller('settingsCtrl', function ($scope, settingsService, $state, $cookies) {
		
		let userId = $cookies.getObject('userLoggedIn')._id;

		$scope.showInputs = true;
		$scope.hideInputs = false;

		$scope.showPicture = true;
		$scope.changePicture = false;

		$scope.fillForm = function () {
			console.log($cookies.getObject('userLoggedIn'));
			settingsService.fillForm(userId)
			.then((response)=>{
				if (response.data._id) {
					console.log(response);
					$scope.user = response.data;
					$scope.pictureUrl = $scope.user.picture;
				}
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
			$scope.update.picture = $scope.changePictureUrl;
			$scope.update._id = userId;
			if ((update !== undefined) && 
				( update['firstName'] && 
				  update['lastName'] && 
				  update['password'] && 
				  update['favoriteQuote'] &&
				  update['picture']
				) 
			   ){
			   	console.log(update);
				settingsService.updateProfile(update)
				.then((response)=>{
					console.log(response);
					$state.go('userProfile');
				})
			}
		}

		$scope.fillForm();




// end of settingsCtrl
	})
angular.module('Deed')
	.controller('homeCtrl', function ($scope, homeService, $state) {
		
		$scope.showPicture = false;

		$scope.startSession =  function () {
			homeService.startSession();
		}

		$scope.createNewUser = function (newUser) {
			newUser.picture = $scope.pictureUrl;
			homeService.createNewUser(newUser)
			.then((response)=>{
				console.log(response);
				$state.go('newUserSuccess');
			})
		}	

		$scope.login = function (user) {
			homeService.login(user)
			.then((response)=>{
				console.log(response);
				$state.go('userProfile');
			})
		}

		

		$scope.onSuccess = function (Blob){
			console.log(Blob);
			$scope.pictureName = Blob.filename;
			$scope.pictureUrl = Blob.url;
			$scope.showPicture = true;
    	};

		$scope.startSession();





// end of homeCtrl		
	})
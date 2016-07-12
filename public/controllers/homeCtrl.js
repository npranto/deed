angular.module('Deed')
	.controller('homeCtrl', function ($scope, homeService, $state, $location, $anchorScroll) {
		
		$scope.showPicture = false;
		
		$scope.scrollTo = function(id) {
	    	$location.hash(id);
	    	$anchorScroll();
	    }

		$scope.startSession =  function () {
			homeService.startSession();
		}

		$scope.createNewUser = function (newUser) {
			if ((newUser !== undefined) && 
				( newUser['email'] && 
				  newUser['password'] && 
				  newUser['firstName'] && 
				  newUser['lastName'] &&
				  newUser['favoriteQuote']
				) &&
				($scope.pictureUrl !== undefined)
			   ){
			   	console.log("RUNNING");
				newUser.picture = $scope.pictureUrl;
				homeService.createNewUser(newUser)
				.then((response)=>{
					console.log(response);
					$state.go('newUserSuccess');
				})
			}
		}	

		$scope.login = function (user) {
			console.log(user);
			if ((user !== undefined) && ( user['email'] && user['password'] )) {
					console.log("LOGINNING IN");
					homeService.login(user)
					.then((response)=>{
						console.log(response);
						$state.go('userProfile');
					})
			}
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
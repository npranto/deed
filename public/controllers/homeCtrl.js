angular.module('Deed')
	.controller('homeCtrl', function ($scope, homeService, $state, $location, $anchorScroll, $cookies) {
		
		$scope.showPicture = false;
		
		$scope.scrollTo = function(id) {
	    	$location.hash(id);
	    	$anchorScroll();
	    }

		// $scope.startSession =  function () {
		// 	homeService.startSession();
		// }

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
				newUser.picture = $scope.pictureUrl;
				console.log(newUser);
				homeService.createNewUser(newUser)
				.then((response)=>{
					console.log(response);
					if (response.data._id) {
						$cookies.putObject('userLoggedIn', response.data);
						console.log($cookies.getObject('userLoggedIn'));
						$state.go('newUserSuccess');
					}
					
				})
			}
		}	

		$scope.login = function (user) {
			// $cookies.putObject('userLoggedIn', user);
			if ((user !== undefined) && ( user['email'] && user['password'] )) {
					homeService.login(user)
					.then((response)=>{
						console.log(response);
						if (response._id) {
							$cookies.putObject('userLoggedIn', response.data);
							console.log($cookies.getObject('userLoggedIn'));
							$state.go('userProfile');
						}
						
					}) 
			}
		}

		$scope.onSuccess = function (Blob){
			console.log(Blob);
			$scope.pictureName = Blob.filename;
			$scope.pictureUrl = Blob.url;
			$scope.showPicture = true;
    	};



		// $scope.startSession();





// end of homeCtrl		
	})
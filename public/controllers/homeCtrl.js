angular.module('Deed')
	.controller('homeCtrl', function ($scope, homeService, $state) {
		
		$scope.startSession =  function () {
			homeService.startSession();
		}

		$scope.createNewUser = function (newUser) {
			homeService.createNewUser(newUser);
		}	

		$scope.login = function (user) {
			homeService.login(user)
			.then((response)=>{
				console.log(response);
				$state.go('userProfile');
			})
		}

		$scope.startSession();





// end of homeCtrl		
	})
angular.module('Deed')
	.controller('homeCtrl', function ($scope, homeService) {
		
		$scope.createNewUser = function (newUser) {
			homeService.createNewUser(newUser);
		}	

		$scope.login = function (user) {
			homeService.login(user)
			.then((response)=>{
				console.log(response.data);
				localStorage.setItem('User-Info', JSON.stringify(response.data));
			})
		}




// end of homeCtrl		
	})
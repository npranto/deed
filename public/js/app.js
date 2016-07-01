angular.module('Deed', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {		
		
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: './views/home.html',
			})
			.state('userProfile', {
				url: '/user/profile',
				templateUrl: './views/user-profile.html'
			})
			.state('newUserSuccess', {
				url: '/newUserSuccess',
				templateUrl: './views/new-user-success.html'
			})
			.state('settings',{
				url: '/settings',
				templateUrl: './views/settings.html'
			})
			.state('searchUsers',{
				url: '/user/search-users',
				templateUrl: './views/search-users.html'
			})
			.state('userProfile.iDeed',{
				url: '/ideeds',
				views : {
				    'iDeed' : {
				    	templateUrl: './views/ideeds.html',
				    }
			    }
			})
			.state('userProfile.followers',{
				url: '/followers',
				views : {
					'followers' : {
						templateUrl: './views/followers.html',
					}
				}
			})
			.state('userProfile.following', {
				url: '/following',
				views: {
					'following' : {
						templateUrl: './views/following.html',
					}
				}
			})
			.state('userProfile.favorites', {
				url: '/....',
				views: {
					'favorites':{
						templateUrl: './views/favorites.html'
					}
				}
			})






// end of config	
	})
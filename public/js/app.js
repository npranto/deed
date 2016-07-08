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
				templateUrl: './views/user-profile.html',
				controller: 'userProfileCtrl'
			})
			.state('newUserSuccess', {
				url: '/newUserSuccess',
				templateUrl: './views/new-user-success.html'
			})
			.state('searchUsers',{
				url: '/user/search-users',
				templateUrl: './views/search-users.html'
			})

			// views inside userProfile
			.state('userProfile.homeFeed',{
				url: '/homeFeed',
				views : {
				    'homeFeed' : {
				    	templateUrl: './views/home-feed.html',
				    }
			    }
			})
			.state('userProfile.iDeeds',{
				url: '/ideeds',
				views : {
				    'iDeeds' : {
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
				url: '/favorites',
				views: {
					'favorites':{
						templateUrl: './views/favorites.html'
					}
				}
			})







// end of config	
	})
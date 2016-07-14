angular.module('Deed', ['ui.router', 'angular-filepicker', 'ngCookies'])
	.config(function ($stateProvider, $urlRouterProvider, filepickerProvider) {		
		
		filepickerProvider.setKey('A0gufrMTYQhqPGbsLunFDz');

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
				templateUrl: './views/new-user-success.html',
				resolve: {
			        redirect: function ($state){
				        window.setTimeout(function(){
				        	$state.go('userProfile');
				        }, 2000);
			    	}
      			}
			})
			.state('settings', {
				url: '/user/settings',
				templateUrl: './views/settings.html',
			})

			// views inside userProfile
			.state('userProfile.searchUsers',{
				url: '/searchUsers',
				views : {
				    'searchUsers' : {
				    	templateUrl: './views/search-users.html',
				    }
			    }
			})
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
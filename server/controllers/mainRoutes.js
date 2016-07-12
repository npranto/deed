const userCtrl = require('./userCtrl.js');
const deedCtrl = require('./deedCtrl.js');

module.exports = (app)=>{

	app.post('/api/startSession', userCtrl.startSession);
	app.post('/api/user/signup', userCtrl.createNewUser);
	app.post('/api/user/login', userCtrl.login);
	app.post('/api/user/logout', userCtrl.logout);
	app.post('/api/user/postDeed', userCtrl.postDeed);
	app.put('/api/deed/makeFavorite', deedCtrl.makeFavorite);
	app.put('/api/deed/lovePost', deedCtrl.lovePost);
	app.put('/api/deed/sobPost', deedCtrl.sobPost);

	app.get('/api/user/getProfile', userCtrl.getProfile);
	app.get('/api/user/iDeeds', userCtrl.getiDeeds);
	app.get('/api/user/feeds', userCtrl.getFeeds);
	app.get('/api/user/favorites', userCtrl.getFavorites);
	app.put('/api/searchUsers', userCtrl.searchUsers);

	app.put('/api/deed/likePost', deedCtrl.likePost);
	app.post('/api/user/follow', userCtrl.follow);
	app.get('/api/user/following', userCtrl.getFollowing);
	app.get('/api/user/followers', userCtrl.getFollowers);
	app.put('/api/user/deleteFavoriteDeed', userCtrl.deleteFavoriteDeed);

}
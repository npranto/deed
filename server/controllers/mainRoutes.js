const userCtrl = require('./userCtrl.js');
const deedCtrl = require('./deedCtrl.js');

module.exports = (app)=>{

	// userCtrl
	app.put('/api/user/login', userCtrl.login);
	app.put('/api/user/createNewUser', userCtrl.createNewUser);
	app.put('/api/user/getProfile', userCtrl.getProfile);
	app.post('/api/user/postDeed', userCtrl.postDeed);
	app.get('/api/user/feeds', userCtrl.getFeeds);
	app.put('/api/searchUsers', userCtrl.searchUsers);
	app.put('/api/user/iDeeds', userCtrl.getiDeeds);
	app.put('/api/user/follow', userCtrl.follow);
	app.put('/api/user/following', userCtrl.getFollowing);
	app.put('/api/user/followers', userCtrl.getFollowers);
	app.put('/api/user/favorites', userCtrl.getFavorites);
	app.put('/api/user/deleteFavoriteDeed', userCtrl.deleteFavoriteDeed);
	app.put('/api/user/updateProfile', userCtrl.updateProfile);

	// deedCtrl
	app.get('/api/deed/getMoment', deedCtrl.getMoment);
	app.put('/api/deed/makeFavorite', deedCtrl.makeFavorite);
	app.put('/api/deed/lovePost', deedCtrl.lovePost);
	app.put('/api/deed/sobPost', deedCtrl.sobPost);
	app.put('/api/deed/likePost', deedCtrl.likePost);

}
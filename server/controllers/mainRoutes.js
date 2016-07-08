const userCtrl = require('./userCtrl.js');
const deedCtrl = require('./deedCtrl.js');

module.exports = (app)=>{
	app.post('/api/startSession', userCtrl.startSession);
	app.post('/api/user/signup', userCtrl.createNewUser);
	app.post('/api/user/login', userCtrl.login);
	app.get('/api/user/getProfile', userCtrl.getProfile);
	app.post('/api/user/logout', userCtrl.logout);
	app.post('/api/user/postDeed', userCtrl.postDeed);
	app.get('/api/user/iDeeds', userCtrl.getiDeeds);
	app.get('/api/user/feeds', userCtrl.getFeeds);
	app.post('/api/deed/makeFavorite', deedCtrl.makeFavorite);
	app.get('/api/user/favorites', userCtrl.getFavorites)
}
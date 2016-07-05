const userCtrl = require('./userCtrl.js')

module.exports = (app)=>{
	app.post('/api/startSession', userCtrl.startSession);
	app.post('/api/user/signup', userCtrl.createNewUser);
	app.post('/api/user/login', userCtrl.login);
	app.get('/api/user/getProfile', userCtrl.getProfile);
	app.post('/api/user/logout', userCtrl.logout);
	// app.post('/api/user/postDeed', userCtrl.postDeed);
}
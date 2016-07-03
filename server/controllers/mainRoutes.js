const userCtrl = require('./userCtrl.js')

module.exports = (app)=>{
	app.post('/api/user/signup', userCtrl.createNewUser);
	app.post('/api/user/login', userCtrl.login);
}
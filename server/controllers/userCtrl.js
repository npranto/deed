const mongoose = require('mongoose');
let User = require('../models/User.js');

module.exports = {

	// createUser saves a new user account
	createNewUser(req, res, next){
		new User(req.body).save((err, userCreated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			// console.log(userCreated);
			return res.status(201).json(userCreated);
		})
	},

	// createNewUser logs an user into his/her account
	login(req, res, next){
		User.find(req.body, (err, userLoggedIn)=>{
			if (err) {
				return res.status(500).json(err);
			}
			if (userLoggedIn) {
				console.log(userLoggedIn);
				console.log(req.body.email);
				return res.status(200).json(userLoggedIn);
			}
			
		})
	},




}

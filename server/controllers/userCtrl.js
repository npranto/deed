const mongoose = require('mongoose');
let User = require('../models/User.js');
let Deed = require('../models/Deed.js');

module.exports = {

	// startSession starts a new session for an user
	startSession (req, res, next){
		if (!req.session.SESSION) {
			req.session.SESSION = [];
		}
		console.log(req.session);
		res.status(200).json();
	},

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
		User.findOne(req.body, (err, userLoggedIn)=>{
			if (err) {
				return res.status(500).json(err);
			}
			req.session.SESSION.push(userLoggedIn);
			// console.log("LOGIN", req.session.SESSION);
			return res.status(200).json(userLoggedIn);
		})
	},

	// getProfile return all info for the logged in user
	getProfile(req, res, next){
		console.log(req.session);
		res.status(200).json(req.session.SESSION);
	},

	// logout ends an user's session
	logout(req, res, next){
		// console.log(req.session);
		req.session.destroy();
		// console.log(req.session);
		res.status(200).json();
	},

	// postDeed (req, res, next){
	// 	User.findById(req.body.author, (err, userFound)=>{
	// 		console.log("userFound", userFound);
	// 	})
	// 	.exec(function (err, author) {
	// 		new Deed({
	// 			author: author,
	// 			textContent: req.body.textContent
	// 		}).save( (err, deedPosted) =>{
	// 			if (err) {
	// 				return res.status(500).json(err);
	// 			}
	// 			return res.status(200).json(deedPosted);
	// 		});
	// 	});

	// },

	

		
	




}

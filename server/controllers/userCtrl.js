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

	postDeed (req, res, next){
		User.findById(req.body.author, (err, userFound)=>{
			
			req.body.author = userFound;

			new Deed(req.body).save( (err, deedPosted)=>{
				if (err) {
					return res.status(500).json(err);
				}
				userFound.iDeeds.push(deedPosted);
				userFound.save((err, result)=>{
					console.log(result)
					return res.status(200).json(deedPosted);
				});
				
			})
		})
	},

	iDeeds(req, res, next){
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{})
		.populate('iDeeds')
		.exec((err, result)=>{
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(result);

		})














		// User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
		// 	Deed.find({author:req.body._id}, (err, deedsFound)=>{
		// 		if (err) {
		// 			return res.status(500).json(err);
		// 		}
		// 		// console.log("DEEDFOUND", deedsFound);
		// 		for (var i = 0; i < deedsFound.length; i++) {
		// 			userFound.iDeeds.push(deedsFound[i]._id);
		// 		}
		// 		console.log("DEEDFOUND", deedsFound);
		// 		console.log("USERFOUND", userFound);
		// 		return res.status(200).json(userFound);
		// 	})
		// 	// User.findById(userFound._id, (err, u)=>{})
		// 	// .populate('User')
		// 	// .exec(function (err, updated) {
		// 	// 	console.log("UPDATED", updated);
		// 	// })
		// })
		// // .populate('User', 'iDeeds')
		// // .exec(function (err, updated) {
		// // 	console.log("UPDATED", updated);
		// // })




	}














	
	

		
	




}

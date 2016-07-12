const mongoose = require('mongoose');
let User = require('../models/User.js');
let Deed = require('../models/Deed.js');

module.exports = {

	// startSession starts a new session for an user
	startSession (req, res, next){
		if (!req.session.SESSION) {
			req.session.SESSION = [];
		}
		// console.log(req.session);
		res.status(200).json();
	},

	// createUser saves a new user account
	createNewUser(req, res, next){
		new User(req.body).save((err, userCreated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			console.log(userCreated);
			// console.log(userCreated);
			req.session.SESSION.push(userCreated);
			console.log(req.session);
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
		// console.log(req.session);
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
					// console.log(result)
					return res.status(200).json(deedPosted);
				});
				
			})
		})
	},

	getiDeeds(req, res, next){
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{})
		.populate('iDeeds')
		.exec((err, result)=>{
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(result);

		})
	},

	getFeeds(req, res, next){
		Deed.find((err, allDeeds)=>{
			// console.log("ALLDEEDS", allDeeds);
			if (err) {
				return res.status(500).json(err);
			}
		})
		.populate('author')
		.exec((err, result)=>{
			if (err) {
				return res.status(500).json(err);
			}
			// console.log(result);
			return res.status(200).json(result);		
		})
	},

	getFavorites(req, res, next){
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
			console.log(userFound);
			if (err) {
				return res.status(500).json(err);
			}
		})
		.populate('favorites')
		.exec((err, favPopulated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			User.populate(favPopulated, {
				path: 'favorites.author',
				model: 'User'
			}, (err, authorPopulated)=>{
				return res.status(200).json(authorPopulated);
			})
			
		})
	},

	searchUsers(req, res, next){
		console.log("HELLO");
		console.log("FIRST NAME:", req.body);
		User.find(req.body, (err, firstsFound)=>{
			console.log(firstsFound);
			if (err) {
				return res.status(500).json(err);
			}
			console.log("firstsFound", firstsFound);
			return res.status(200).json(firstsFound);
		})
	},

	follow(req, res, next){
		// console.log("FOLLOW USERID", req.body)
		User.findById(req.body._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			if ((userFound.followers.indexOf(req.session.SESSION[0]._id)) === -1) {
				userFound.followers.push(req.session.SESSION[0]);
				userFound.save((err, userSaved)=>{
					// console.log("userSaved", userSaved);
					// console.log("ME", req.session.SESSION[0]);
				})
				User.findById(req.session.SESSION[0]._id, (err, sessionUserFound)=>{
					console.log("MYSELF");
					// req.session.SESSION[0].following.push(userFound);
					sessionUserFound.following.push(userFound);
					sessionUserFound.save((err, sessionUserSaved)=>{
					// console.log("userSaved", userSaved);
					// console.log("ME", req.session.SESSION[0]);
					})
				})
			}
			
			// console.log("userFound", userFound);
			// console.log("ME", req.session.SESSION[0]);
			return res.status(200).json(userFound);
		})
	},

	getFollowing(req, res, next){
		console.log("req.session", req.session);
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			console.log("userFound", userFound);
		})
		.populate('following')
		.exec((err, followingPopulated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			console.log('followingPopulated', followingPopulated);
			return res.status(200).json(followingPopulated);
		})
	},

	getFollowers(req, res, next){
		console.log("req.session", req.session);
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			console.log("userFound", userFound);
		})
		.populate('followers')
		.exec((err, followersPopulated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			console.log('followingPopulated', followersPopulated);
			return res.status(200).json(followersPopulated);
		})
	},

	deleteFavoriteDeed(req, res, next){
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			userFound.favorites.splice(userFound.favorites.indexOf(req.body._id), 1);
			userFound.save((err, userSaved)=>{})

			Deed.findById(req.body._id, (err, deedFound)=>{
				deedFound.stars.splice(deedFound.stars.indexOf(req.session.SESSION[0]._id), 1);
				deedFound.save((err, deedSaved)=>{});
			})


			return res.status(200).json(userFound); 
		})
	}










}

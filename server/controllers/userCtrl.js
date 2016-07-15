const mongoose = require('mongoose');
let User = require('../models/User.js');
let Deed = require('../models/Deed.js');

module.exports = {

	// createUser saves a new user account
	createNewUser(req, res, next){
		new User(req.body).save((err, userCreated)=>{
			if (err) {
				console.log("ERROR");
				return res.status(500).json(err);
			}
			console.log("userCreated", userCreated);
			return res.status(200).json(userCreated);
		})
	},

	// createNewUser logs an user into his/her account
	login(req, res, next){
		User.findOne(req.body, (err, userLoggedIn)=>{
			if (err) {
				return res.status(500).json(err);
			}
			console.log("userLoggedIn", userLoggedIn);
			return res.status(200).json(userLoggedIn);
		})
	},

	// getProfile return all info for the logged in user
	getProfile(req, res, next){
		User.findById(req.body._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(userFound);
		})
	},

	// creates a new post 
	postDeed (req, res, next){
		User.findById(req.body.author, (err, userFound)=>{
			req.body.author = userFound;
			new Deed(req.body).save( (err, deedPosted)=>{
				if (err) {
					return res.status(500).json(err);
				}
				userFound.iDeeds.push(deedPosted);
				userFound.save((err, userSaved)=>{});
				return res.status(200).json(deedPosted);
			})
		})
	},

	// gets user's iDeeds 
	getiDeeds(req, res, next){
		User.findById(req.body._id, (err, userFound)=>{})
		.populate('iDeeds')
		.exec((err, userPopulated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(userPopulated);

		})
	},

	// gets all the posts by all the users
	getFeeds(req, res, next){
		Deed.find((err, allDeeds)=>{
			if (err) {
				return res.status(500).json(err);
			}
		})
		.populate('author')
		.exec((err, deedsPopulated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(deedsPopulated);		
		})
	},

	// gets posts that user starred
	getFavorites(req, res, next){
		User.findById(req.body._id, (err, userFound)=>{
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

	// returns user found on database
	searchUsers(req, res, next){
		User.find(req.body, (err, firstsFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(firstsFound);
		})
	},

	// stores user's following list with followed user &
	// store's followed user's follower list with the user
	follow(req, res, next){
		User.findById(req.body._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			User.findOne({email: req.body.email}, (err, userLoggedIn)=>{
				if ((userFound.followers.indexOf(userLoggedIn._id)) === -1) {
					userFound.followers.push(userLoggedIn);
					userFound.save((err, userSaved)=>{})

					userLoggedIn.following.push(userFound);
					userLoggedIn.save((err, userLoggedInSaved)=>{})
				}
			})
			return res.status(200).json(userFound);
		})
	},

	// returns a list of users who user follow
	getFollowing(req, res, next){
		User.findById(req.body._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
		})
		.populate('following')
		.exec((err, followingPopulated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(followingPopulated);
		})
	},

	// return a list of users who follow the user
	getFollowers(req, res, next){
		User.findById(req.body._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
		})
		.populate('followers')
		.exec((err, followersPopulated)=>{
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(followersPopulated);
		})
	},

	// deletes specific post from the user's favorite's list
	deleteFavoriteDeed(req, res, next){
		User.findOne({email: req.body.email}, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			userFound.favorites.splice(userFound.favorites.indexOf(req.body._id), 1);
			userFound.save((err, userSaved)=>{})

			Deed.findById(req.body._id, (err, deedFound)=>{
				deedFound.stars.splice(deedFound.stars.indexOf(userFound._id), 1);
				deedFound.save((err, deedSaved)=>{});
			})
			return res.status(200).json(userFound); 
		})
	},

	// updates user's profile information through settings
	updateProfile(req, res, next){
		User.findById(req.body._id, (err, userFound)=>{
			if(err){
				return res.status(500).json(err);
			}
			userFound.firstName = req.body.firstName;
			userFound.lastName = req.body.lastName;
			userFound.password = req.body.password;
			userFound.favoriteQuote = req.body.favoriteQuote;
			userFound.picture = req.body.picture;

			userFound.save((err, userSaved)=>{})
			return res.status(200).json(userFound);
		})
	}

// end of userCtrl
}

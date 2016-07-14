const mongoose = require('mongoose');
let User = require('../models/User.js');
let Deed = require('../models/Deed.js');

module.exports = {

	//return the deed of the moment
	getMoment(req, res, next){
		Deed.find((err, allDeeds)=>{
			if (err) {
				return res.status(500).json(err);
			}
			let mostLiked; let numberOfLikes = 0;
			for (var i = 0; i < allDeeds.length; i++) {
				if(allDeeds[i].likes.length >= numberOfLikes){
					mostLiked = allDeeds[i];
					numberOfLikes = allDeeds[i].likes.length;
				}
			}
			Deed.findById(mostLiked._id, (err, momentFound)=>{})
			.populate('author')
			.exec((err, momentPopulated)=>{
				return res.status(200).json(momentPopulated);
			})
		})
	},

	// stores a specific post on the user's favorite list
	makeFavorite(req, res, next){
		User.findOne({email: req.body.email}, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			Deed.findById(req.body._id, (err, deedFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				userFound.save((err, userSaved)=>{})
				if ((deedFound.stars.indexOf(userFound._id)) === -1) {
					deedFound.stars.push(userFound);
					userFound.favorites.push(deedFound);
				}
				deedFound.save((err, deedSaved)=>{
					Deed.findById(deedSaved._id, (err, deedToPopulate)=>{})
					.populate('likes')
					.exec((err, starsPopulated)=>{
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json(starsPopulated);
					})
				})
			})
		})
	},

	// updates a specific post with +1 like and adds specific user who liked it
	likePost(req, res, next){
		User.findOne({email: req.body.email}, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			Deed.findById(req.body._id, (err, deedFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				if ((deedFound.likes.indexOf(userFound._id)) === -1) {
					deedFound.likes.push(userFound);
				}
				deedFound.save((err, deedSaved)=>{
					Deed.findById(deedSaved._id, (err, deedToPopulate)=>{})
					.populate('likes')
					.exec((err, likesPopulated)=>{
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json(likesPopulated);
					})
				})

			})
		})
	},

	// updates a specific post with +1 love and adds specific user who loved it
	lovePost(req, res, next){
		User.findOne({email: req.body.email}, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			Deed.findById(req.body._id, (err, deedFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				if ((deedFound.loves.indexOf(userFound._id)) === -1) {
					deedFound.loves.push(userFound);
				}
				deedFound.save((err, deedSaved)=>{
					Deed.findById(deedSaved._id, (err, deedToPopulate)=>{})
					.populate('loves')
					.exec((err, lovesPopulated)=>{
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json(lovesPopulated);
					})
				})

			})
		})
	},

	// updates a specific post with +1 sob and adds specific user who sobbed to it
	sobPost(req, res, next){
		User.findOne({email: req.body.email}, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			Deed.findById(req.body._id, (err, deedFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				if ((deedFound.sobs.indexOf(userFound._id)) === -1) {
					deedFound.sobs.push(userFound);
				}
				deedFound.save((err, deedSaved)=>{
					Deed.findById(deedSaved._id, (err, deedToPopulate)=>{})
					.populate('loves')
					.exec((err, sobsPopulated)=>{
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json(sobsPopulated);
					})
				})

			})
		})
	}

// end of deedCtrl
}
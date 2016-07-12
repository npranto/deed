const mongoose = require('mongoose');
let User = require('../models/User.js');
let Deed = require('../models/Deed.js');

module.exports = {
	makeFavorite(req, res, next){
		console.log("REQ.BODY", req.body);
		console.log(req.session);
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			Deed.findById(req.body._id, (err, deedFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				
				userFound.save((err, userSaved)=>{
					console.log("userSaved", userSaved);
				})
				if ((deedFound.stars.indexOf(req.session.SESSION[0]._id)) === -1) {
					deedFound.stars.push(userFound);
					userFound.favorites.push(deedFound);
				}
				deedFound.save((err, deedSaved)=>{
					console.log("RUNNING 1");
					console.log(deedSaved);
					Deed.findById(deedSaved._id, (err, deedToPopulate)=>{})
					.populate('likes')
					.exec((err, starsPopulated)=>{
						console.log("likesPopulated", starsPopulated);
						if (err) {
							return res.status(500).json(err);
						}
						console.log("userFound", userFound);
						return res.status(200).json(starsPopulated);
					})
				})

			})
		})





		// Deed.findById(req.body._id, (err, deedFound)=>{
		// 	deedFound.stars = deedFound.stars + 1;
		// 	deedFound.save((err, deedSaved)=>{
		// 		if (err) {
		// 			return res.status(500).json(err);
		// 		}
		// 	})
		// 	User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
		// 		if (err) {
		// 			return res.status(500).json(err);
		// 		}
		// 		userFound.favorites.push(deedFound);
		// 		userFound.save((err, result)=>{
		// 			if (err) {
		// 				return res.status(500).json(err);
		// 			}
		// 			return res.status(200).json(result);
		// 		})
		// 	})
		// })
	},

	likePost(req, res, next){
		console.log("REQ.BODY", req.body);
		console.log(req.session);
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			Deed.findById(req.body._id, (err, deedFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				if ((deedFound.likes.indexOf(req.session.SESSION[0]._id)) === -1) {
					deedFound.likes.push(userFound);
				}
				deedFound.save((err, deedSaved)=>{
					console.log("RUNNING 1");
					console.log(deedSaved);
					Deed.findById(deedSaved._id, (err, deedToPopulate)=>{})
					.populate('likes')
					.exec((err, likesPopulated)=>{
						console.log("likesPopulated", likesPopulated);
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json(likesPopulated);
					})
				})

			})
		})
	},

	lovePost(req, res, next){
		console.log("REQ.BODY", req.body);
		console.log(req.session);
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			Deed.findById(req.body._id, (err, deedFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				if ((deedFound.loves.indexOf(req.session.SESSION[0]._id)) === -1) {
					deedFound.loves.push(userFound);
				}
				deedFound.save((err, deedSaved)=>{
					console.log("RUNNING 1");
					console.log(deedSaved);
					Deed.findById(deedSaved._id, (err, deedToPopulate)=>{})
					.populate('loves')
					.exec((err, lovesPopulated)=>{
						console.log("likesPopulated", lovesPopulated);
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json(lovesPopulated);
					})
				})

			})
		})
	},

	sobPost(req, res, next){
		console.log("REQ.BODY", req.body);
		console.log(req.session);
		User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
			if (err) {
				return res.status(500).json(err);
			}
			Deed.findById(req.body._id, (err, deedFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				if ((deedFound.sobs.indexOf(req.session.SESSION[0]._id)) === -1) {
					deedFound.sobs.push(userFound);
				}
				deedFound.save((err, deedSaved)=>{
					console.log("RUNNING 1");
					console.log(deedSaved);
					Deed.findById(deedSaved._id, (err, deedToPopulate)=>{})
					.populate('loves')
					.exec((err, sobsPopulated)=>{
						console.log("likesPopulated", sobsPopulated);
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json(sobsPopulated);
					})
				})

			})
		})
	}



}
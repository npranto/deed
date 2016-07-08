const mongoose = require('mongoose');
let User = require('../models/User.js');
let Deed = require('../models/Deed.js');

module.exports = {
	makeFavorite(req, res, next){
		Deed.findById(req.body._id, (err, deedFound)=>{
			console.log("deedFound", deedFound);
			deedFound.stars = deedFound.stars + 1;
			deedFound.save((err, deedSaved)=>{
				if (err) {
					return res.status(500).json(err);
				}
			})

			User.findById(req.session.SESSION[0]._id, (err, userFound)=>{
				if (err) {
					return res.status(500).json(err);
				}
				console.log("SESSION", req.session);
				console.log("userFound", userFound);

				userFound.favorites.push(deedFound);
				userFound.save((err, result)=>{
					if (err) {
						return res.status(500).json(err);
					}
					console.log("result", result);

					return res.status(200).json(result);
				})
			})
		})
	}
}
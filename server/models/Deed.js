const mongoose = require('mongoose');

const DeedSchema = new mongoose.Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	textContent: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
	stars: {type: Number},
	likes: {type: Number},
	loves: {type: Number},
	tearUps: {type: Number}
});

module.exports = mongoose.model('Deed', DeedSchema);
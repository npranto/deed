const mongoose = require('mongoose');

const DeedSchema = new mongoose.Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	textContent: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
	stars: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	}],
	likes: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	}],
	loves: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	}],
	sobs: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	}]
});

module.exports = mongoose.model('Deed', DeedSchema);
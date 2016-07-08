const mongoose = require('mongoose');

const DeedSchema = new mongoose.Schema({
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	textContent: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
	stars: {type: Number, default: 0},
	likes: {type: Number, default: 0},
	loves: {type: Number, default: 0},
	tearUps: {type: Number, default: 0}
});

module.exports = mongoose.model('Deed', DeedSchema);
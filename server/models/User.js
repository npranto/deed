const mongoose = require('mongoose');
// const moment = require('moment');

const UserSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	favoriteQuote: {type: String, required: true},
	picture: {type: String, required: true},
	createdAt: {type: Date, default: new Date()},
	iDeeds: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Deed',
	}],
	followers: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
	}],
	following: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
	}],
	favorites: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Deed',
	}],
});

module.exports = mongoose.model('User', UserSchema);
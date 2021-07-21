const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
        username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
		},
        profilePicture: {
			type: String,
            default:"",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('userData', userSchema);

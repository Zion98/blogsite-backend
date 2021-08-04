const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: false,
		},
		photo: {
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: false,
		},
        facebook: {
			type: String,
			required: false,
		},
        twitter: {
			type: String,
			required: false,
		},
       
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('articleInfo', articleSchema);

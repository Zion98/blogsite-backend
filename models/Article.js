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
			type: Array,
			required: false,
		},
        twitter: {
			type: Array,
			required: false,
		},
       
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('articleInfo', articleSchema);

// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const articleSchema = new Schema(
// 	{
// 		fullname: {
// 			type: String,
// 			required: true,
// 		},
// 		facebook: {
// 			type: String,
// 			required: true,
// 		},
// 		twitter: {
// 			type: String,
// 			required: true,
// 		},
// 		data: {
// 			type: String,
// 			required: true,
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// module.exports = mongoose.model('articleData', articleSchema);

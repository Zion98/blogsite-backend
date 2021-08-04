const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Article = require('../models/Article');

async function postArticle(req, res) {
	try {
		const { title, desc, photo, username, categories, facebook, twitter } = req.body;
		console.log(req.body);
		console.log("article posted")
		const newArticle = await new Article({
			title,
			desc,
			photo,
			username,
			categories,
			facebook,
			twitter,
		});
		newArticle.save();

		res.status(200).send({
			status: true,
			message: 'Data successfully created',
			data: newArticle,
		});
	} catch (error) {
		res.status(500).json('error');
	}
}

//UPDATE
async function updateArticle(req, res) {
	try {
		const article = Article.findById(req.params.id);

		if (Article.username === req.body.userName) {
			try {
				const updateArticle = await Post.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updateArticle);
			} catch (error) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json('You can only update your Account!');
		}
	} catch (error) {
		res.status(500).json(err);
	}
}

// DELETE
async function deleteArticle(req, res) {
	if (req.body.userId === req.params.id) {
		try {
			const article = await Article.findById(req.params.id);
			try {
				await article.delete();
				res.status(200).json('Article has been deleted');
			} catch (error) {
				res.status(500).json(err);
			}
		} catch (error) {
			res.status(500).json(err);
		}
	} else {
		res.status(401).json('You can only delete your Articles!');
	}
}

// GET ARTICLES BY ID
async function getArticleID(req, res) {
	try {
		const article = await Article.findById(req.params.id);
		res.status(200).json(article);
	} catch (error) {
		res.status(500).json(err);
	}
}

// GET ARTICLES
async function getArticle(req, res) {
	const userName = req.query.user;
	const catName = req.query.cat;

	try {

		let article;
		if (userName) {
			article = await Article.findBy({ username });
		} else if (catName) {
			article = await Article.find({
				categories: {
					$in: [catName],
				},
			});
		} else {
			article = await Article.find();
		}
		res.status(200).json(article);
	} catch (error) {
		res.status(500).json(err);
	}
}

module.exports = {
	postArticle,
	updateArticle,
	deleteArticle,
	getArticleID,
	getArticle,
};

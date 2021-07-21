const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Article = require('../models/Article');
const Category = require('../models/Category');

async function createCategory(req, res) {
	const newCat = new Category(req.body);

	try {
		const savedCat = await newCat.save();

		return res.status(200).json(savedCat);
	} catch (error) {
		return res.status(500).json(err);
	}
}

async function getCategory(_req, res) {
	try {
		const cats = await Category.find();
		res.status(200).json(cats);
	} catch (error) {
		res.status(500).json(err);
	}
}

module.exports = {
	createCategory,
	getCategory,
};

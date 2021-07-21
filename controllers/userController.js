const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const article = require("../models/Article");
//UPDATE
async function updateUser(req, res) {
  try {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your Account!");
    }
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
}

// DELETE
async function deleteUser(req, res) {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await article.deleteMany({ userName: user.userName });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (error) {
        res.status(500).json(err);
      }
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your Account!");
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllUsers(req, res) {
  console.log("retro");
  try {
    console.log("casde");
    const user = await User.find({});
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).json({ Message: "Not Allowed to view All users" });
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};

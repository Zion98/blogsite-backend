const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken, hashPassword, comparePassword } = require("../helpers");
async function signUpUser(req, res) {
  try {
    console.log("inner signup");
    const { email } = req.body;
    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
      password: hashedPassword,
    });

    console.log(newUser);
    if (newUser) {
      const token = await generateToken({ id: newUser.id, email });

      newUser.save();

      const response = {
        newUser,
        token,
      };

      return res.status(201).json({ status: "Success", data: response });
    }
    return res.status(400).json({ message: "Error, Occurred" });
  } catch (error) {
    return res.status(500).json({ message: "Try Again, Network Issues" });
  }
}

async function signInUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({message:"Wrong Credentials"});
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(400).json("Wrong Password");
    }
    // const { password, ...others } = user._doc;
    const token = await generateToken({ id: user._id, email: user.email });

    const data = {
      userId: user.id,
      username: user.username,
      email: user.id,
      token,
    };

    return res.status(200).json({
      message: "Logged in successfully",
      data,
    });
  } catch (error) {
    console.log("tenorrroe");
    return res.status(400).json({ error: "Invalid Password or Email" });
  }
}

module.exports = {
  signUpUser,
  signInUser,
};

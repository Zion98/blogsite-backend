const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const User = require("../models/User");
const userController = require("../controllers/userController");

const { updateUser, deleteUser, getUser, getAllUsers } = userController;
// GET ALL
router.get("/users", getAllUsers);
// GET
router.get("/:id", getUser);

//UPDATE
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);

module.exports = router;

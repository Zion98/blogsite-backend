const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const catController = require("../controllers/catController");

const { createCategory, getCategory } = catController;

router.post("/post", auth, createCategory);

router.get("/get", auth, getCategory);

module.exports = router;

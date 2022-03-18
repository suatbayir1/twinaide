// Libraries
const express = require('express');
const router = express.Router();

// Controller Functions
const { register, getUser, login, logout } = require('../controllers/auth');

// Middlewares
const { getAccessToRoute } = require('../middlewares/auth/auth');

// Routes
router.post("/register", register);
router.get("/profile", getAccessToRoute, getUser);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);

module.exports = router;
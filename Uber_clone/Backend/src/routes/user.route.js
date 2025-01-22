const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserLogin, handleGetUserProfile, handleUserLogout} = require('../controllers/user.controller');
const checkAuth = require("../middleware/auth.middleware");

// express validator imports
const { body } = require('express-validator');

router.post("/signup", [
    body('fullName.firstName').isLength({ min: 3 }).withMessage("First Name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be atleast 8 characters long"),
], handleUserSignup)

router.post("/login", [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be atleast 8 characters long"),
], handleUserLogin)

router.get("/user-profile", checkAuth, handleGetUserProfile);

router.get("/logout", checkAuth, handleUserLogout)

module.exports = router;
const express = require('express');
const router = express.Router();
const { handleUserSignup } = require('../controllers/user.controller');

// express validator imports
const { body } = require('express-validator');

router.post("/signup", [
    body('fullName.firstName').isLength({ min: 3 }).withMessage("First Name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be atleast 8 characters long"),
], handleUserSignup)

module.exports = router;
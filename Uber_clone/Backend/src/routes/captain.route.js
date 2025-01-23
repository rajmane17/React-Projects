const express = require('express');
const router = express.Router();
const { handleCaptainSignup } = require('../controllers/captain.controller')

router.post("/signup", [], handleCaptainSignup)

module.exports = router;
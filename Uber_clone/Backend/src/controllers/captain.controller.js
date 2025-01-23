const Captain = require("../models/captain.model.js")
const { validationResult } = require('express-validator');

async function handleCaptainSignup(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}

module.exports = {
    handleCaptainSignup,
}
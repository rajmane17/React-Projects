const Captain = require("../models/captain.model.js")
const blacklistToken = require('../models/blacklistToken.model');
const { validationResult } = require('express-validator');

async function handleCaptainSignup(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    if (!fullName || !email || !password || !vehicle) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const existingCaptain = await Captain.findOne({ email });

    if (existingCaptain) {
        return res.status(400).json({ error: "Captain already exists" });
    }

    const newCaptain = await Captain.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plateNumber: vehicle.plateNumber,
            capacity: vehicle.capacity,
            type: vehicle.type
        }
    });

    if (!newCaptain) {
        return res.status(500).json({ error: "Could not create captain" });
    }

    const captainToken = newCaptain.generateAccessToken();

    return res
        .status(201)
        .cookie('captainToken', captainToken)
        .json({ captainToken: captainToken, captain: newCaptain });

}

async function handleCaptainLogin(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const existingCaptain = await Captain.findOne({ email }).select('+password');

    if (!existingCaptain) {
        return res.status(400).json({ error: "Captain does not exist" });
    }

    const isPasswordCorrect = await existingCaptain.comparePassword(password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    const captainToken = existingCaptain.generateAccessToken();
    existingCaptain.password = undefined;

    return res
        .status(200)
        .cookie('captainToken', captainToken)
        .json({ captainToken: captainToken, captain: existingCaptain });
}

async function handleCaptainLogout(req, res) {

try {
        const captainToken = req.cookies.captainToken || req.headers.authorization.split(' ')[1];
    
        if (!captainToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        await blacklistToken.create({ token: captainToken });
        const isBlacklisted = await blacklistToken.findOne({ token: captainToken });
    
        if (!isBlacklisted) {
            return res.status(500).json({ error: "Could not blacklist token" });
        }
    
        const options = {
            httpOnly: true,
            secure: true,
        };
    
        return res
            .status(200)
            .clearCookie('captainToken', options)
            .json({ msg: "Logged out successfully" });
} catch (error) {
    console.log(error.message);
}

}

async function handleGetCaptainProfile(req, res) {
    return res.status(200).json({ captain: req.captain });
}

module.exports = {
    handleCaptainSignup,
    handleCaptainLogin,
    handleCaptainLogout,
    handleGetCaptainProfile
}
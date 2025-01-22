const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const blacklistToken = require('../models/blacklistToken.model');

const handleUserSignup = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // creating a new user
        const newUser = await User.create({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName
            },
            email,
            password
        });

        // just to assure if the user is created successfully
        const newUserCreated = await User.findById(newUser._id).select('-password');

        if (!newUserCreated) {
            return res.status(500).json({ msg: "something went wrong while creating the user" });
        }

        // we will receive a token
        const token = newUserCreated.generateAccessToken();

        res.status(201).json({ token, user: newUserCreated });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const handleUserLogin = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Both email and password are required" });
        }

        const getUser = await User.findOne({ email }).select('+password');

        if (!getUser) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const isMatch = await getUser.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const options = {
            // by default our cookies can be modified by anyone, but enabling these option restricts that.
            httpOlnly: true,
            secure: true,
        }

        const token = getUser.generateAccessToken();

        getUser.password = undefined;

        return res.status(200)
            .cookie('token', token, options)
            .json({
                msg: "Logged in successfully",
                token: token,
                user: getUser
            });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

const handleGetUserProfile = async (req, res) => {
    return res.status(200).json({ user: req.user });
}

const handleUserLogout = async (req, res) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    
        // adding the token to the blacklist
        await blacklistToken.create({ token });
        const isBlacklisted = await blacklistToken.findOne({ token });
    
        if (isBlacklisted) {
            return res.status(401).json({ msg: "You have been logged out" });
        }
    
        const options = {
            // by default our cookies can be modified by anyone, but enabling these option restricts that.
            httpOlnly: true,
            secure: true,
        }
    
        res.status(200).clearCookie("token", options).json({ msg: "Logged out successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
        
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleGetUserProfile,
    handleUserLogout
}
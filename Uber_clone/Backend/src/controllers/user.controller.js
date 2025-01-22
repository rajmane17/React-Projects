const User = require('../models/user.model');
const { validationResult } = require('express-validator');

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

module.exports = {
    handleUserSignup
};
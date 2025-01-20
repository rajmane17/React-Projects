const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minlength: [3, "First name must be atleast 3 characters long"],
        lowercase: true,
    },
    lastName:{
        type:String,
        required: true,
        minlength: [3, "First name must be atleast 3 characters long"],
        lowercase: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
        select: false,
        minlength: [8, "Password must be atleast 8 characters long"],
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
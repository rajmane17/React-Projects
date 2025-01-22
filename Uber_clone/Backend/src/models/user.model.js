const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required: true,
            minlength: [3, "First Name must be atleast 3 characters long"],
            lowercase: true,
        },
        lastName:{
            type:String,
            minlength: [3, "Last Name must be atleast 3 characters long"],
            lowercase: true,
        }
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

userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.generateAccessToken = function(){
    const user = this;
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24hr'});

    return token;
}

userSchema.methods.comparePassword = function(password){
    // compares the password entered by the user with the password stored in the database and returns a boolean value
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
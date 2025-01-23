const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
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
    },
    socketId:{
        type:String,
    },
    status:{
        type: String,
        default: ["inactive", "Captain is not available"],
        enum: ['active', 'inactive'],
    },
    vehicle:{
        color:{
            type: String,
            required: true,
        },
        // model:{
        //     type: String,
        //     required: true,
        // },
        plateNumber:{
            type: String,
            required: true,
        },
        capacity:{
            type: Number,
            required: [true, "Vehicle capacity must be atleast 1"],
        },
        type:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        }
    },
    location:{
        latitude:{
            type: Number,
            required: true,
        },
        longitude:{
            type: Number,
            required: true,
        }
    }
}, {timestamps: true});

captainSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

captainSchema.methods.generateAccessToken = function(){
    const captain = this;
    const payload = {
        _id: captain._id,
        fullName: captain.fullName,
        email: captain.email,
        vehicle: captain.vehicle,
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24hr'});

    return token;
}

captainSchema.methods.comparePassword = function(password){
    // compares the password entered by the user with the password stored in the database and returns a boolean value
    return bcrypt.compare(password, this.password);
}

const Captain = mongoose.model('Captain', captainSchema);

module.exports = Captain;
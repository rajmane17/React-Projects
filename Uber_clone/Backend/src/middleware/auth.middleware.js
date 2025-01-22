const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function checkAuth (req, res, next){
try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        if (!decodedToken) {
            return res.status(401).json({ msg: "Invalid Token" });
        }
    
        const user = await User.findById(decodedToken._id);
        req.user = user;
        next();

} catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
}

}

module.exports = checkAuth;
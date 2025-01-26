const Captain = require("../models/captain.model");
const jwt = require("jsonwebtoken");

async function checkCaptainAuth(req, res, next) {
    try {
        const token = req.cookies?.captainToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ msg: "Invalid Token" });
        }

        const captain = await Captain.findById(decodedToken._id);
        req.captain = captain;
        next();

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

}

module.exports = checkCaptainAuth;
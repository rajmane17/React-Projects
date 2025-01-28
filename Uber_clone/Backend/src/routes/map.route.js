const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/auth.middleware");
const {handleGetCoordinates, handleGetDistance, handleSuggestions} = require("../controllers/maps.controller")
const {query} = require("express-validator")

router.get("/get-coordinates",
    query("address").isString().isLength({min: 3}),
    checkAuth, handleGetCoordinates);

router.get("/get-distance",
    query("source").isString().isLength({min: 3}),
    query("destination").isString().isLength({min: 3}),
    checkAuth, handleGetDistance);

router.get("/suggestions",
    query("input").isString().isLength({min: 3}),
    checkAuth, handleSuggestions)

module.exports = router;
const { getLocationCoordinates, getDistance, getSuggestions } = require('../services/maps.service');
const { validationResult } = require("express-validator")

async function handleGetCoordinates(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await getLocationCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);

        // Handle specific error cases
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'Address not found' });
        }

        if (error.message.includes('Invalid API key')) {
            return res.status(401).json({ message: 'Invalid API key. Please check your configuration.' });
        }

        // Default to 500 for unhandled errors
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function handleGetDistance(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { source, destination } = req.query;

    try {
        const response = await getDistance(source, destination);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error in handleGetDistance:', error);

        // Handle custom errors with statusCode and message
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        // Handle unexpected errors
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function handleSuggestions(req, res) {
     try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await getSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { handleGetCoordinates, handleGetDistance, handleSuggestions };
const axios = require('axios'); // Import axios for making HTTP requests

async function getLocationCoordinates(address) {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const endpoint = `https://maps.googleapis.com/maps/api/geocode/json`;

        // Make the API call
        const response = await axios.get(endpoint, {
            params: {
                address: address,
                key: apiKey
            }
        });

        // Handle the API response
        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } else {
            throw new Error(`Geocoding API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw error; // Re-throw the error for the caller to handle
    }
}


async function getDistance(source, destination) {
    try {
        // Replace with your Google Cloud API key
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const endpoint = `https://maps.googleapis.com/maps/api/distancematrix/json`;

        // Validate input
        if (!source || !destination) {
            throw {
                statusCode: 400,
                message: 'Source and destination are required',
            };
        }

        // Make the API request
        const response = await axios.get(endpoint, {
            params: {
                origins: source,
                destinations: destination,
                key: apiKey,
            },
        });

        // Check API response
        if (response.data.status !== "OK") {
            throw {
                statusCode: 500,
                message: `Google API error: ${response.data.status}`,
            };
        }

        // Extract distance information
        const element = response.data.rows[0].elements[0];
        if (element.status !== "OK") {
            throw {
                statusCode: 400,
                message: `Invalid locations: ${element.status}`,
            };
        }

        // Return distance and duration
        return {
            distance: element.distance.text,
            duration: element.duration.text,
        };
    } catch (error) {
        // Custom error handling
        if (error.statusCode) {
            throw error; // Re-throw custom errors
        } else {
            console.error("Unexpected error:", error);
            throw {
                statusCode: 500,
                message: "An unexpected error occurred",
            };
        }
    }
}

async function getSuggestions(input){
    if(!input){
        throw new Error("No input provided");
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {getLocationCoordinates, getDistance, getSuggestions};
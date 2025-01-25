const express = require('express');
const router = express.Router();
const { handleCaptainSignup, handleCaptainLogin } = require('../controllers/captain.controller')
const {body} = require('express-validator');

router.post("/signup", [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastName').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body("vehicle.plateNumber").isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body("vehicle.type").isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be car, bike or auto'),
], handleCaptainSignup)

router.post("/login", [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], handleCaptainLogin)

module.exports = router;
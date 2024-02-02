const { body } = require('express-validator');

exports.validateMessage = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('message').notEmpty().withMessage('Message is required'),
];
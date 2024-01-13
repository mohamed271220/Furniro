const { body } = require('express-validator');

exports.validateAddress = [
  body('street').notEmpty().withMessage('Street is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('postalCode').notEmpty().withMessage('Postal Code is required'),
  body('country').notEmpty().withMessage('Country is required'),
];
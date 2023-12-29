const { body } = require('express-validator');

exports.validateAddress = [
  body('address.street').notEmpty().withMessage('Street is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.postalCode').notEmpty().withMessage('Postal Code is required'),
  body('address.country').notEmpty().withMessage('Country is required'),
];
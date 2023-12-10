const { body } = require('express-validator');

exports.validateProduct = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('sale').optional().isNumeric().withMessage('Sale must be a number'),
  body('isNew').optional().isBoolean().withMessage('isNew must be a boolean'),
  body('images')
    .optional()
    .custom((value) => {
      try {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue);
      } catch (err) {
        return false;
      }
    })
    .withMessage('Images are required'),
  body('rating').optional().isNumeric().withMessage('Rating must be a number').custom(value => value >= 0 && value <= 5).withMessage('Rating must be between 0 and 5'),
  body('sizeOptions')
    .optional()
    .custom((value) => {
      try {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue);
      } catch (err) {
        return false;
      }
    })
    .withMessage('Size options are required'),
  body('Tags')
    .optional()
    .custom((value) => {
      try {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue);
      } catch (err) {
        return false;
      }
    })
    .withMessage('Tags are required'),
  body('shortDescription').notEmpty().withMessage('Short description is required'),
  body('description')
    .optional()
    .custom((value) => {
      try {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue);
      } catch (err) {
        return false;
      }
    })
    .withMessage('Description are required'),
  body('color')
    .optional()
    .custom((value) => {
      try {
        const parsedValue = JSON.parse(value);
        return Array.isArray(parsedValue);
      } catch (err) {
        return false;
      }
    })
    .withMessage('Color are required'),
  body('salesPackage').notEmpty().withMessage('Sales package is required'),
  body('modal').notEmpty().withMessage('Modal is required'),
  body('secondaryMat').notEmpty().withMessage('Secondary material is required'),
  body('config').notEmpty().withMessage('Configuration is required'),
  body('color').optional().custom((value) => {
    try {
      const parsedValue = JSON.parse(value);
      return Array.isArray(parsedValue);
    } catch (err) {
      return false;
    }
  }).withMessage('Color must be an array'),
  body('fillingMat').notEmpty().withMessage('Filling material is required'),
  body('load').notEmpty().withMessage('Load is required'),
  body('origin').notEmpty().withMessage('Origin is required'),
  body('width').optional().isNumeric().withMessage('Width must be a number'),
  body('height').optional().isNumeric().withMessage('Height must be a number'),
  body('depth').optional().isNumeric().withMessage('Depth must be a number'),
  body('weight').optional().isNumeric().withMessage('Weight must be a number'),
  body('seatHeight').optional().isNumeric().withMessage('Seat height must be a number'),
  body('legHeight').optional().isNumeric().withMessage('Leg height must be a number'),
  body('status').optional().isIn(['available', 'unavailable']).withMessage('Status must be either "available" or "unavailable"'),
];
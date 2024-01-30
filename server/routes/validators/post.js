const { body } = require('express-validator');

exports.validateBlogPost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('image').notEmpty().withMessage('Image is required'),
  body('tag').optional().isString().withMessage('Tag must be a string'),
  body('body')
  .custom((value) => {
    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch (err) {
      throw new Error('Body must be a valid JSON string');
    }

    if (!Array.isArray(parsedValue)) {
      throw new Error('Body must be an array');
    }

    for (let i = 0; i < parsedValue.length; i++) {
      if (!parsedValue[i].type || !['title', 'paragraph', 'image'].includes(parsedValue[i].type)) {
        throw new Error('Invalid type in body');
      }
      if (!parsedValue[i].content) {
        throw new Error('Content is required in body');
      }
      if (parsedValue[i].type === 'image' && parsedValue[i].isValid !== true) {
        throw new Error('Image is not valid');
      }
    }
    return true;
  }),
];
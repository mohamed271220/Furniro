const { body } = require('express-validator');

exports.validateBlogPost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('image').notEmpty().withMessage('Image is required'),
  body('tag').optional().isString().withMessage('Tag must be a string'),
  body('body').isArray().withMessage('Body must be an array').bail()
    .custom((value) => {
      for (let i = 0; i < value.length; i++) {
        if (!value[i].type || !['title', 'paragraph', 'image'].includes(value[i].type)) {
          throw new Error('Invalid type in body');
        }
        if (!value[i].content) {
          throw new Error('Content is required in body');
        }
      }
      return true;
    }),
];
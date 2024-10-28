const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController'); // Import the author controller

// Define routes
router.get('/:authorId', authorController.getArticlesByAuthor);

// Export the router
module.exports = router;

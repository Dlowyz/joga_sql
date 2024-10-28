const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController'); // Ensure path is correct

// Define routes using the controller functions
router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);

// Export the router
module.exports = router;
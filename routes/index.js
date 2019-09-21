const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');

// Articles routes
router.get('/articles', articlesController.list);
router.post('/articles/create', articlesController.create);
router.get('/articles/:id', articlesController.details);
router.patch('/articles/:id/update', articlesController.update);
router.delete('/articles/:id/delete', articlesController.delete);

module.exports = router;
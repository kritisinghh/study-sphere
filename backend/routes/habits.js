const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habitsController');

// Get all habits
router.get('/', habitsController.getAll);

// Get habits with stats
router.get('/stats', habitsController.getWithStats);

// Get habit by ID
router.get('/:id', habitsController.getById);

// Create a new habit
router.post('/', habitsController.create);

// Track habit completion
router.post('/:id/track', habitsController.trackCompletion);

// Update a habit
router.put('/:id', habitsController.update);

// Delete a habit
router.delete('/:id', habitsController.delete);

module.exports = router; 

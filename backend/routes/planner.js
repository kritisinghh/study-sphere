const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

// Get all tasks
router.get('/', plannerController.getAll);

// Get task by ID
router.get('/:id', plannerController.getById);

// Get tasks by date
router.get('/date/:date', plannerController.getByDate);

// Create a new task
router.post('/', plannerController.create);

// Update a task
router.put('/:id', plannerController.update);

// Delete a task
router.delete('/:id', plannerController.delete);

module.exports = router; 

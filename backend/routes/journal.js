const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

// Get all journal entries
router.get('/', journalController.getAll);

// Get entries by date range
router.get('/range', journalController.getByDateRange);

// Get entry by ID
router.get('/:id', journalController.getById);

// Create a new entry
router.post('/', journalController.create);

// Create an encrypted entry
router.post('/encrypted', journalController.createEncrypted);

// Decrypt an entry
router.post('/:id/decrypt', journalController.decrypt);

// Update an entry
router.put('/:id', journalController.update);

// Delete an entry
router.delete('/:id', journalController.delete);

module.exports = router; 

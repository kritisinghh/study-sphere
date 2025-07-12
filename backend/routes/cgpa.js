const express = require('express');
const router = express.Router();
const cgpaController = require('../controllers/cgpaController');

// Get all semesters
router.get('/', cgpaController.getAll);

// Get semester by ID
router.get('/:id', cgpaController.getById);

// Calculate CGPA for a user
router.get('/user/:userId/calculate', cgpaController.calculateCGPA);

// Add a new semester
router.post('/', cgpaController.addSemester);

// Update a semester
router.put('/:id', cgpaController.update);

// Update courses in a semester
router.put('/:id/courses', cgpaController.updateCourses);

// Delete a semester
router.delete('/:id', cgpaController.delete);

module.exports = router; 

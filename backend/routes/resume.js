const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Get all resumes
router.get('/', resumeController.getAll);

// Get resume by ID
router.get('/:id', resumeController.getById);

// Get all resumes for a user
router.get('/user/:userId', resumeController.getUserResumes);

// Generate resume for rendering
router.get('/:id/generate', resumeController.generateResume);

// Create a new resume
router.post('/', resumeController.createResume);

// Add a section to a resume
router.post('/:id/section', resumeController.addSection);

// Update a resume
router.put('/:id', resumeController.update);

// Update a section in a resume
router.put('/:id/section/:sectionId', resumeController.updateSection);

// Delete a resume
router.delete('/:id', resumeController.delete);

module.exports = router; 

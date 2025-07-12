const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

// Get all PDFs
router.get('/', pdfController.getAll);

// Get PDF by ID with highlights
router.get('/:id', pdfController.getPDFWithHighlights);

// Upload a PDF
router.post('/upload', pdfController.uploadPDF);

// Add a highlight to a PDF
router.post('/:id/highlight', pdfController.addHighlight);

// Delete a highlight
router.delete('/:id/highlight/:highlightId', pdfController.deleteHighlight);

// Delete a PDF
router.delete('/:id', pdfController.delete);

module.exports = router; 

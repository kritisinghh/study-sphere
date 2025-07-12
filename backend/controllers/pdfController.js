const BaseController = require('./baseController');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configure file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const userDir = path.join(__dirname, '..', 'data', 'pdfs', req.body.userId || 'public');
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    
    cb(null, userDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  }
});

class PDFController extends BaseController {
  constructor() {
    super('pdf');
  }

  // Upload a PDF file
  uploadPDF = async (req, res) => {
    try {
      // Single file upload using multer
      upload.single('pdfFile')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // Create PDF record
        const pdfRecord = {
          userId: req.body.userId || 'public',
          title: req.body.title || req.file.originalname,
          fileName: req.file.filename,
          filePath: req.file.path,
          highlights: [],
          notes: []
        };
        
        const savedPdf = await this.model.create(pdfRecord);
        res.status(201).json(savedPdf);
      });
    } catch (error) {
      res.status(500).json({ error: `Failed to upload PDF: ${error.message}` });
    }
  }

  // Add a highlight to a PDF
  addHighlight = async (req, res) => {
    try {
      const { id } = req.params;
      const { text, color, page, coordinates, note } = req.body;
      
      if (!text || !page) {
        return res.status(400).json({ error: 'Text and page are required' });
      }
      
      const pdf = await this.model.getById(id);
      if (!pdf) {
        return res.status(404).json({ error: 'PDF not found' });
      }
      
      // Create highlight object
      const highlight = {
        id: Date.now().toString(),
        text,
        color: color || 'yellow',
        page,
        coordinates: coordinates || {},
        note: note || '',
        createdAt: new Date().toISOString()
      };
      
      // Add highlight to PDF
      if (!pdf.highlights) {
        pdf.highlights = [];
      }
      
      pdf.highlights.push(highlight);
      
      // Save updated PDF
      const updatedPdf = await this.model.update(id, pdf);
      res.json(updatedPdf);
    } catch (error) {
      res.status(400).json({ error: `Failed to add highlight: ${error.message}` });
    }
  }

  // Get PDF with highlights
  getPDFWithHighlights = async (req, res) => {
    try {
      const { id } = req.params;
      
      const pdf = await this.model.getById(id);
      if (!pdf) {
        return res.status(404).json({ error: 'PDF not found' });
      }
      
      res.json(pdf);
    } catch (error) {
      res.status(500).json({ error: `Failed to get PDF with highlights: ${error.message}` });
    }
  }

  // Delete a highlight
  deleteHighlight = async (req, res) => {
    try {
      const { id, highlightId } = req.params;
      
      const pdf = await this.model.getById(id);
      if (!pdf) {
        return res.status(404).json({ error: 'PDF not found' });
      }
      
      if (!pdf.highlights) {
        return res.status(404).json({ error: 'No highlights found' });
      }
      
      // Filter out the highlight
      pdf.highlights = pdf.highlights.filter(h => h.id !== highlightId);
      
      // Save updated PDF
      const updatedPdf = await this.model.update(id, pdf);
      res.json(updatedPdf);
    } catch (error) {
      res.status(400).json({ error: `Failed to delete highlight: ${error.message}` });
    }
  }
}

module.exports = new PDFController(); 

const BaseController = require('./baseController');

class ResumeController extends BaseController {
  constructor() {
    super('resume');
  }

  // Create a new resume
  createResume = async (req, res) => {
    try {
      const { userId, title, sections } = req.body;
      
      if (!userId || !title) {
        return res.status(400).json({ error: 'User ID and title are required' });
      }
      
      const resume = {
        userId,
        title,
        sections: sections || [],
        createdAt: new Date().toISOString(),
        isActive: true
      };
      
      const newResume = await this.model.create(resume);
      res.status(201).json(newResume);
    } catch (error) {
      res.status(400).json({ error: `Failed to create resume: ${error.message}` });
    }
  }

  // Get all resumes for a user
  getUserResumes = async (req, res) => {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      const allResumes = await this.model.getAll();
      const userResumes = allResumes.filter(resume => resume.userId === userId);
      
      res.json(userResumes);
    } catch (error) {
      res.status(500).json({ error: `Failed to get user resumes: ${error.message}` });
    }
  }

  // Add a section to a resume
  addSection = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, type, order } = req.body;
      
      if (!title || !type) {
        return res.status(400).json({ error: 'Section title and type are required' });
      }
      
      const resume = await this.model.getById(id);
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      
      // Create section
      const section = {
        id: Date.now().toString(),
        title,
        content: content || '',
        type,
        order: order || resume.sections.length + 1,
        createdAt: new Date().toISOString()
      };
      
      // Add section to resume
      if (!resume.sections) {
        resume.sections = [];
      }
      
      resume.sections.push(section);
      
      // Sort sections by order
      resume.sections.sort((a, b) => a.order - b.order);
      
      // Save updated resume
      const updatedResume = await this.model.update(id, resume);
      res.json(updatedResume);
    } catch (error) {
      res.status(400).json({ error: `Failed to add section: ${error.message}` });
    }
  }

  // Update a section
  updateSection = async (req, res) => {
    try {
      const { id, sectionId } = req.params;
      const updates = req.body;
      
      const resume = await this.model.getById(id);
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      
      if (!resume.sections) {
        return res.status(404).json({ error: 'No sections found' });
      }
      
      // Find section index
      const sectionIndex = resume.sections.findIndex(section => section.id === sectionId);
      if (sectionIndex === -1) {
        return res.status(404).json({ error: 'Section not found' });
      }
      
      // Update section
      resume.sections[sectionIndex] = {
        ...resume.sections[sectionIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Sort sections by order if order was updated
      if (updates.order) {
        resume.sections.sort((a, b) => a.order - b.order);
      }
      
      // Save updated resume
      const updatedResume = await this.model.update(id, resume);
      res.json(updatedResume);
    } catch (error) {
      res.status(400).json({ error: `Failed to update section: ${error.message}` });
    }
  }

  // Generate resume as JSON for template rendering
  generateResume = async (req, res) => {
    try {
      const { id } = req.params;
      const { template } = req.query;
      
      const resume = await this.model.getById(id);
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      
      // Structure the resume data for rendering
      const resumeData = {
        id: resume.id,
        title: resume.title,
        template: template || 'standard',
        sections: resume.sections || [],
        generatedAt: new Date().toISOString()
      };
      
      res.json(resumeData);
    } catch (error) {
      res.status(500).json({ error: `Failed to generate resume: ${error.message}` });
    }
  }
}

module.exports = new ResumeController(); 

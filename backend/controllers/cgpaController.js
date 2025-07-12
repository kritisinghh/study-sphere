const BaseController = require('./baseController');

class CGPAController extends BaseController {
  constructor() {
    super('cgpa');
  }

  // Calculate CGPA
  calculateCGPA = async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Get all semesters for the user
      const allSemesters = await this.model.getAll();
      const userSemesters = allSemesters.filter(semester => semester.userId === userId);
      
      if (!userSemesters.length) {
        return res.json({ cgpa: 0, totalCredits: 0, semesters: [] });
      }
      
      let totalGradePoints = 0;
      let totalCredits = 0;
      
      // Calculate total grade points and credits
      userSemesters.forEach(semester => {
        if (!semester.courses) return;
        
        semester.courses.forEach(course => {
          const { credits, grade } = course;
          const gradePoint = this.convertGradeToPoints(grade);
          totalGradePoints += (gradePoint * credits);
          totalCredits += credits;
        });
      });
      
      // Calculate CGPA
      const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
      
      res.json({
        cgpa: parseFloat(cgpa),
        totalCredits,
        semesters: userSemesters
      });
    } catch (error) {
      res.status(500).json({ error: `Failed to calculate CGPA: ${error.message}` });
    }
  }

  // Convert letter grade to grade points
  convertGradeToPoints(grade) {
    const gradeMap = {
      'A+': 10,
      'A': 9,
      'B+': 8,
      'B': 7,
      'C+': 6,
      'C': 5,
      'D': 4,
      'F': 0
    };
    
    return gradeMap[grade] || 0;
  }

  // Add a new semester
  addSemester = async (req, res) => {
    try {
      const { userId, name, courses } = req.body;
      
      if (!userId || !name) {
        return res.status(400).json({ error: 'User ID and semester name are required' });
      }
      
      // Calculate semester GPA
      let totalGradePoints = 0;
      let totalCredits = 0;
      
      if (courses && courses.length) {
        courses.forEach(course => {
          const { credits, grade } = course;
          const gradePoint = this.convertGradeToPoints(grade);
          totalGradePoints += (gradePoint * credits);
          totalCredits += credits;
        });
      }
      
      const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
      
      // Create semester
      const semester = {
        userId,
        name,
        courses: courses || [],
        gpa: parseFloat(gpa),
        totalCredits
      };
      
      const newSemester = await this.model.create(semester);
      res.status(201).json(newSemester);
    } catch (error) {
      res.status(400).json({ error: `Failed to add semester: ${error.message}` });
    }
  }

  // Update semester with new courses
  updateCourses = async (req, res) => {
    try {
      const { id } = req.params;
      const { courses } = req.body;
      
      if (!courses) {
        return res.status(400).json({ error: 'Courses are required' });
      }
      
      const semester = await this.model.getById(id);
      if (!semester) {
        return res.status(404).json({ error: 'Semester not found' });
      }
      
      // Calculate new GPA
      let totalGradePoints = 0;
      let totalCredits = 0;
      
      courses.forEach(course => {
        const { credits, grade } = course;
        const gradePoint = this.convertGradeToPoints(grade);
        totalGradePoints += (gradePoint * credits);
        totalCredits += credits;
      });
      
      const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
      
      // Update semester
      const updatedSemester = {
        ...semester,
        courses,
        gpa: parseFloat(gpa),
        totalCredits
      };
      
      const result = await this.model.update(id, updatedSemester);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: `Failed to update courses: ${error.message}` });
    }
  }
}

module.exports = new CGPAController(); 

const BaseController = require('./baseController');

class PlannerController extends BaseController {
  constructor() {
    super('planner');
  }

  // Custom method for getting tasks by date
  getByDate = async (req, res) => {
    try {
      const { date } = req.params;
      const allTasks = await this.model.getAll();
      
      // Filter tasks by date
      const tasksByDate = allTasks.filter(task => {
        return task.date === date || 
               (task.recurring && this.isRecurringOnDate(task, date));
      });
      
      res.json(tasksByDate);
    } catch (error) {
      res.status(500).json({ error: `Failed to get tasks by date: ${error.message}` });
    }
  }

  // Helper method to check if a recurring task is on a given date
  isRecurringOnDate(task, dateString) {
    if (!task.recurring) return false;
    
    const taskDate = new Date(task.date);
    const checkDate = new Date(dateString);
    
    switch (task.recurringType) {
      case 'daily':
        return true;
      case 'weekly':
        return taskDate.getDay() === checkDate.getDay();
      case 'monthly':
        return taskDate.getDate() === checkDate.getDate();
      default:
        return false;
    }
  }
}

module.exports = new PlannerController(); 

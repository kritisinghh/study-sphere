const BaseController = require('./baseController');

class HabitsController extends BaseController {
  constructor() {
    super('habits');
  }

  // Custom method for tracking habit completion
  trackCompletion = async (req, res) => {
    try {
      const { id } = req.params;
      const { date, completed } = req.body;
      
      if (!date) {
        return res.status(400).json({ error: 'Date is required' });
      }
      
      const habit = await this.model.getById(id);
      if (!habit) {
        return res.status(404).json({ error: 'Habit not found' });
      }
      
      // Initialize tracking array if it doesn't exist
      if (!habit.tracking) {
        habit.tracking = [];
      }
      
      // Check if there's already an entry for this date
      const existingIndex = habit.tracking.findIndex(entry => entry.date === date);
      
      if (existingIndex >= 0) {
        // Update existing entry
        habit.tracking[existingIndex].completed = completed;
      } else {
        // Add new entry
        habit.tracking.push({ date, completed });
      }
      
      // Calculate current streak
      habit.currentStreak = this.calculateStreak(habit.tracking);
      
      const updatedHabit = await this.model.update(id, habit);
      res.json(updatedHabit);
    } catch (error) {
      res.status(500).json({ error: `Failed to track habit completion: ${error.message}` });
    }
  }

  // Calculate current streak
  calculateStreak(tracking) {
    if (!tracking || !tracking.length) return 0;
    
    // Sort tracking entries by date, newest first
    const sortedTracking = [...tracking].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedTracking.length; i++) {
      const entry = sortedTracking[i];
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      
      // If not completed, break the streak
      if (!entry.completed) break;
      
      // For first entry, check if it's today or yesterday
      if (i === 0) {
        const isToday = entryDate.getTime() === today.getTime();
        const isYesterday = entryDate.getTime() === today.getTime() - 86400000;
        
        if (!isToday && !isYesterday) break;
      } 
      // For subsequent entries, check if they're consecutive days
      else if (i > 0) {
        const prevDate = new Date(sortedTracking[i-1].date);
        prevDate.setHours(0, 0, 0, 0);
        
        const expectedDate = new Date(prevDate);
        expectedDate.setDate(prevDate.getDate() - 1);
        
        if (entryDate.getTime() !== expectedDate.getTime()) break;
      }
      
      streak++;
    }
    
    return streak;
  }

  // Get habits with streaks
  getWithStats = async (req, res) => {
    try {
      const habits = await this.model.getAll();
      
      // Calculate stats for each habit
      const habitsWithStats = habits.map(habit => {
        if (!habit.tracking) {
          habit.tracking = [];
        }
        
        const stats = {
          totalDays: habit.tracking.filter(entry => entry.completed).length,
          currentStreak: habit.currentStreak || 0,
          longestStreak: habit.longestStreak || 0
        };
        
        return { ...habit, stats };
      });
      
      res.json(habitsWithStats);
    } catch (error) {
      res.status(500).json({ error: `Failed to get habits with stats: ${error.message}` });
    }
  }
}

module.exports = new HabitsController(); 

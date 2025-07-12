/**
 * StudySphere Utility Helper Functions
 */

// Data encryption for journal entries
const encryptionHelpers = {
    // Simple encryption/decryption using AES
    // In a real app, use a proper encryption library
    encryptData: function(data, password) {
        try {
            // For demonstration purposes only - not secure for production
            const encoded = btoa(JSON.stringify(data));
            const key = btoa(password);
            return encoded + '.' + key.substring(0, 8);
        } catch (error) {
            console.error('Encryption error:', error);
            return null;
        }
    },
    
    decryptData: function(encryptedData, password) {
        try {
            // For demonstration purposes only - not secure for production
            const parts = encryptedData.split('.');
            const data = parts[0];
            return JSON.parse(atob(data));
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }
};

// Date and time helpers
const dateHelpers = {
    getToday: function() {
        return new Date().toISOString().split('T')[0];
    },
    
    formatDate: function(dateStr, format = 'long') {
        const date = new Date(dateStr);
        
        if (format === 'long') {
            return date.toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } else if (format === 'short') {
            return date.toLocaleDateString(undefined, { 
                month: 'short', 
                day: 'numeric' 
            });
        } else if (format === 'time') {
            return date.toLocaleTimeString(undefined, { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
        
        return date.toLocaleDateString();
    },
    
    getDaysBetween: function(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    
    getWeekNumber: function(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }
};

// CGPA calculation helpers
const academicHelpers = {
    calculateGPA: function(courses) {
        if (!courses || courses.length === 0) return 0;
        
        let totalCredits = 0;
        let totalGradePoints = 0;
        
        courses.forEach(course => {
            totalCredits += course.credits;
            totalGradePoints += course.credits * course.gradePoint;
        });
        
        return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    },
    
    calculateCGPA: function(semesters) {
        if (!semesters || semesters.length === 0) return 0;
        
        let totalCredits = 0;
        let totalGradePoints = 0;
        
        semesters.forEach(semester => {
            semester.courses.forEach(course => {
                totalCredits += course.credits;
                totalGradePoints += course.credits * course.gradePoint;
            });
        });
        
        return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    },
    
    getLetterGrade: function(percentage) {
        if (percentage >= 90) return 'A+';
        if (percentage >= 85) return 'A';
        if (percentage >= 80) return 'A-';
        if (percentage >= 75) return 'B+';
        if (percentage >= 70) return 'B';
        if (percentage >= 65) return 'B-';
        if (percentage >= 60) return 'C+';
        if (percentage >= 55) return 'C';
        if (percentage >= 50) return 'C-';
        if (percentage >= 45) return 'D+';
        if (percentage >= 40) return 'D';
        return 'F';
    },
    
    getGradePoint: function(letterGrade) {
        const gradePoints = {
            'A+': 4.0,
            'A': 4.0,
            'A-': 3.7,
            'B+': 3.3,
            'B': 3.0,
            'B-': 2.7,
            'C+': 2.3,
            'C': 2.0,
            'C-': 1.7,
            'D+': 1.3,
            'D': 1.0,
            'F': 0.0
        };
        
        return gradePoints[letterGrade] || 0;
    }
};

// Study planner helpers
const plannerHelpers = {
    calculatePriority: function(deadline, importance) {
        const daysLeft = dateHelpers.getDaysBetween(dateHelpers.getToday(), deadline);
        
        // Priority scale 1-10
        let priority = 0;
        
        // Base priority on importance (1-5 scale)
        priority += importance * 2;
        
        // Adjust based on deadline proximity
        if (daysLeft <= 1) priority += 10;
        else if (daysLeft <= 3) priority += 8;
        else if (daysLeft <= 7) priority += 5;
        else if (daysLeft <= 14) priority += 3;
        else priority += 1;
        
        // Cap at 10
        return Math.min(10, Math.max(1, Math.round(priority / 2)));
    },
    
    suggestStudyTime: function(priority, difficulty, contentSize) {
        // Base time in minutes
        let baseTime = 30;
        
        // Adjust for priority (1-10 scale)
        baseTime += priority * 10;
        
        // Adjust for difficulty (1-5 scale)
        baseTime += difficulty * 15;
        
        // Adjust for content size (1-5 scale)
        baseTime += contentSize * 20;
        
        return baseTime;
    },
    
    generateStudySchedule: function(tasks, availableHours) {
        // Sort tasks by priority
        const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority);
        
        const schedule = [];
        let remainingTime = availableHours * 60; // convert to minutes
        
        for (const task of sortedTasks) {
            const suggestedTime = this.suggestStudyTime(
                task.priority, 
                task.difficulty, 
                task.contentSize
            );
            
            // If we can fit the whole task
            if (suggestedTime <= remainingTime) {
                schedule.push({
                    ...task,
                    allocated: suggestedTime
                });
                remainingTime -= suggestedTime;
            } else if (remainingTime > 15) {
                // If we have at least 15 mins, allocate what we have
                schedule.push({
                    ...task,
                    allocated: remainingTime
                });
                remainingTime = 0;
            }
            
            if (remainingTime <= 0) break;
        }
        
        return schedule;
    }
};

// PDF handling helpers
const pdfHelpers = {
    extractTextFromPage: function(pageData) {
        // Placeholder - in a real app this would use a PDF library
        console.log('Extracting text from PDF page');
        return 'Sample text from PDF';
    },
    
    createHighlight: function(pageNumber, position, text, color = 'yellow') {
        return {
            id: Date.now().toString(),
            pageNumber,
            position,
            text,
            color,
            timestamp: new Date().toISOString()
        };
    },
    
    getHighlightsForPage: function(highlights, pageNumber) {
        return highlights.filter(h => h.pageNumber === pageNumber);
    }
};

// Export all helpers
const Helpers = {
    encryption: encryptionHelpers,
    date: dateHelpers,
    academic: academicHelpers,
    planner: plannerHelpers,
    pdf: pdfHelpers
}; 

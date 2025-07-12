// Utility functions for StudySphere

// Generate a unique ID
function generateID() {
    return Date.now().toString();
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    const d = new Date(da   te);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
}

// Parse date from YYYY-MM-DD
function parseDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

// Format time to HH:MM
function formatTime(date) {
    const d = new Date(date);
    const hours = `${d.getHours()}`.padStart(2, '0');
    const minutes = `${d.getMinutes()}`.padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Calculate days between two dates
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
}

// Calculate streak based on consecutive completed dates
function calculateStreak(dates) {
    if (!dates || dates.length === 0) return 0;
    
    const sortedDates = [...dates].sort((a, b) => new Date(b) - new Date(a));
    let streak = 1;
    
    for (let i = 0; i < sortedDates.length - 1; i++) {
        const current = new Date(sortedDates[i]);
        const next = new Date(sortedDates[i + 1]);
        
        current.setHours(0, 0, 0, 0);
        next.setHours(0, 0, 0, 0);
        
        // Check if dates are consecutive
        const expectedPrevDate = new Date(current);
        expectedPrevDate.setDate(current.getDate() - 1);
        
        if (next.getTime() === expectedPrevDate.getTime()) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// Save data to local storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get data from local storage
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Clear data from local storage
function clearFromLocalStorage(key) {
    localStorage.removeItem(key);
}

// Calculate grade points based on letter grade
function calculateGradePoints(grade) {
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

// Calculate CGPA from courses
function calculateCGPA(courses) {
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    courses.forEach(course => {
        totalCredits += course.credits;
        totalGradePoints += calculateGradePoints(course.grade) * course.credits;
    });
    
    if (totalCredits === 0) return 0;
    
    return (totalGradePoints / totalCredits).toFixed(2);
}

// Simple encryption for journal entries
function encryptText(text, password) {
    if (!text || !password) return text;
    
    // Simple XOR encryption (not secure, just for demonstration)
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) ^ password.charCodeAt(i % password.length);
        result += String.fromCharCode(charCode);
    }
    return btoa(result); // Base64 encode the result
}

// Simple decryption for journal entries
function decryptText(encryptedText, password) {
    if (!encryptedText || !password) return encryptedText;
    
    try {
        const text = atob(encryptedText); // Base64 decode
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) ^ password.charCodeAt(i % password.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    } catch (e) {
        console.error('Decryption failed:', e);
        return 'Decryption failed. Wrong password?';
    }
}

// API Integration functions
const API_URL = 'http://localhost:3000/api';

// Generic fetch function with error handling
async function fetchAPI(endpoint, options = {}) {
    try {
        const url = `${API_URL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API request failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        // Fall back to local storage if API fails
        return null;
    }
}

// Planner API functions
const plannerAPI = {
    getTasks: async () => {
        const tasks = await fetchAPI('/planner');
        return tasks || getFromLocalStorage('tasks') || [];
    },
    
    getTasksByDate: async (date) => {
        const tasks = await fetchAPI(`/planner/date/${date}`);
        return tasks || [];
    },
    
    createTask: async (task) => {
        const newTask = await fetchAPI('/planner', {
            method: 'POST',
            body: JSON.stringify(task)
        });
        return newTask;
    },
    
    updateTask: async (id, updates) => {
        const updatedTask = await fetchAPI(`/planner/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
        return updatedTask;
    },
    
    deleteTask: async (id) => {
        await fetchAPI(`/planner/${id}`, {
            method: 'DELETE'
        });
    }
};

// Habits API functions
const habitsAPI = {
    getHabits: async () => {
        const habits = await fetchAPI('/habits');
        return habits || getFromLocalStorage('habits') || [];
    },
    
    getHabitsWithStats: async () => {
        const habits = await fetchAPI('/habits/stats');
        return habits || [];
    },
    
    createHabit: async (habit) => {
        const newHabit = await fetchAPI('/habits', {
            method: 'POST',
            body: JSON.stringify(habit)
        });
        return newHabit;
    },
    
    trackCompletion: async (id, date, completed) => {
        const updatedHabit = await fetchAPI(`/habits/${id}/track`, {
            method: 'POST',
            body: JSON.stringify({ date, completed })
        });
        return updatedHabit;
    },
    
    updateHabit: async (id, updates) => {
        const updatedHabit = await fetchAPI(`/habits/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
        return updatedHabit;
    },
    
    deleteHabit: async (id) => {
        await fetchAPI(`/habits/${id}`, {
            method: 'DELETE'
        });
    }
};

// Journal API functions
const journalAPI = {
    getEntries: async () => {
        const entries = await fetchAPI('/journal');
        return entries || getFromLocalStorage('journal') || [];
    },
    
    getEntriesByDateRange: async (startDate, endDate) => {
        const entries = await fetchAPI(`/journal/range?startDate=${startDate}&endDate=${endDate}`);
        return entries || [];
    },
    
    createEntry: async (entry) => {
        const newEntry = await fetchAPI('/journal', {
            method: 'POST',
            body: JSON.stringify(entry)
        });
        return newEntry;
    },
    
    createEncryptedEntry: async (entry, password) => {
        const newEntry = await fetchAPI('/journal/encrypted', {
            method: 'POST',
            body: JSON.stringify({...entry, password})
        });
        return newEntry;
    },
    
    decryptEntry: async (id, password) => {
        const decryptedEntry = await fetchAPI(`/journal/${id}/decrypt`, {
            method: 'POST',
            body: JSON.stringify({password})
        });
        return decryptedEntry;
    }
};

// CGPA API functions
const cgpaAPI = {
    getSemesters: async () => {
        const semesters = await fetchAPI('/cgpa');
        return semesters || getFromLocalStorage('semesters') || [];
    },
    
    calculateCGPA: async (userId) => {
        const result = await fetchAPI(`/cgpa/user/${userId}/calculate`);
        return result || { cgpa: 0, totalCredits: 0, semesters: [] };
    },
    
    addSemester: async (semester) => {
        const newSemester = await fetchAPI('/cgpa', {
            method: 'POST',
            body: JSON.stringify(semester)
        });
        return newSemester;
    },
    
    updateCourses: async (id, courses) => {
        const updatedSemester = await fetchAPI(`/cgpa/${id}/courses`, {
            method: 'PUT',
            body: JSON.stringify({courses})
        });
        return updatedSemester;
    }
};

// PDF API functions
const pdfAPI = {
    getPDFs: async () => {
        const pdfs = await fetchAPI('/pdf');
        return pdfs || [];
    },
    
    getPDFWithHighlights: async (id) => {
        const pdf = await fetchAPI(`/pdf/${id}`);
        return pdf;
    },
    
    uploadPDF: async (file, title, userId) => {
        const formData = new FormData();
        formData.append('pdfFile', file);
        formData.append('title', title);
        formData.append('userId', userId);
        
        const response = await fetch(`${API_URL}/pdf/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Upload failed');
        }
        
        return await response.json();
    },
    
    addHighlight: async (pdfId, highlight) => {
        const newHighlight = await fetchAPI(`/pdf/${pdfId}/highlight`, {
            method: 'POST',
            body: JSON.stringify(highlight)
        });
        return newHighlight;
    }
};

// Resume API functions
const resumeAPI = {
    getResumes: async (userId) => {
        const resumes = userId ? 
            await fetchAPI(`/resume/user/${userId}`) : 
            await fetchAPI('/resume');
        return resumes || getFromLocalStorage('resumes') || [];
    },
    
    createResume: async (resume) => {
        const newResume = await fetchAPI('/resume', {
            method: 'POST',
            body: JSON.stringify(resume)
        });
        return newResume;
    },
    
    addSection: async (resumeId, section) => {
        const updatedResume = await fetchAPI(`/resume/${resumeId}/section`, {
            method: 'POST',
            body: JSON.stringify(section)
        });
        return updatedResume;
    },
    
    updateSection: async (resumeId, sectionId, updates) => {
        const updatedResume = await fetchAPI(`/resume/${resumeId}/section/${sectionId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
        return updatedResume;
    },
    
    generateResume: async (resumeId, template) => {
        const resumeData = await fetchAPI(`/resume/${resumeId}/generate?template=${template || 'standard'}`);
        return resumeData;
    }
};

// Expose functions
window.studySphereUtils = {
    generateID,
    formatDate,
    parseDate,
    formatTime,
    daysBetween,
    calculateStreak,
    saveToLocalStorage,
    getFromLocalStorage,
    clearFromLocalStorage,
    calculateGradePoints,
    calculateCGPA,
    encryptText,
    decryptText,
    plannerAPI,
    habitsAPI,
    journalAPI,
    cgpaAPI,
    pdfAPI,
    resumeAPI
}; 

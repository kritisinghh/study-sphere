// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('StudySphere App Initialized');
    
    // Initialize navigation
    initNavigation();
    
    // Initialize all modules
    initDashboard();
    
    // Add default avatar if image doesn't exist
    const userAvatar = document.querySelector('.user-avatar');
    userAvatar.onerror = function() {
        this.src = 'https://ui-avatars.com/api/?name=Student&background=4f46e5&color=fff';
    };
});

// Handle page navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show the corresponding page
            const pageId = link.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // Load page specific data if needed
            loadPageData(pageId);
        });
    });
}

// Load data for specific pages as needed
function loadPageData(pageId) {
    switch(pageId) {
        case 'dashboard':
            // Dashboard is already initialized on app load
            break;
        case 'planner':
            initPlanner();
            break;
        case 'habits':
            initHabits();
            break;
        case 'journal':
            initJournal();
            break;
        case 'pdf':
            initPdfTools();
            break;
        case 'cgpa':
            initCgpaTracker();
            break;
        case 'resume':
            initResumeManager();
            break;
        case 'feedback':
            initFeedback();
            break;
        case 'learning':
            initLearningPath();
            break;
    }
}

// Utility function for showing notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to the document
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility function for data storage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Utility function for date formatting
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Placeholder initialization functions for each module
// These will be implemented in their respective files
function initDashboard() {
    console.log('Dashboard initialized');
    // Implementation will be in dashboard.js
}

function initPlanner() {
    console.log('Planner initialized');
    // Implementation will be in planner.js
}

function initHabits() {
    console.log('Habits initialized');
    // Implementation will be in habits.js
}

function initJournal() {
    console.log('Journal initialized');
    // Implementation will be in journal.js
}

function initPdfTools() {
    console.log('PDF Tools initialized');
    // Implementation will be in pdf.js
}

function initCgpaTracker() {
    console.log('CGPA Tracker initialized');
    // Implementation will be in cgpa.js
}

function initResumeManager() {
    console.log('Resume Manager initialized');
    // Implementation will be in resume.js
}

function initFeedback() {
    console.log('Feedback initialized');
    // Implementation will be in feedback.js
}

function initLearningPath() {
    console.log('Learning Path initialized');
    // Implementation will be in learning.js
} 

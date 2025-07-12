/**
 * Dashboard Page
 * Main overview of the student's progress, tasks, and habits
 */

// Sample data - would be loaded from backend or localStorage in a real app
const dashboardData = {
    tasks: [
        { id: 1, title: 'Math Assignment', subject: 'Mathematics', deadline: '2023-07-15', completed: false },
        { id: 2, title: 'Physics Lab Report', subject: 'Physics', deadline: '2023-07-18', completed: false },
        { id: 3, title: 'Term Paper', subject: 'Literature', deadline: '2023-07-22', completed: false },
        { id: 4, title: 'CS Project', subject: 'Computer Science', deadline: '2023-07-25', completed: false },
        { id: 5, title: 'Chemistry Quiz', subject: 'Chemistry', deadline: '2023-07-10', completed: true }
    ],
    studySessions: [
        { id: 1, subject: 'Mathematics', date: '2023-07-10', duration: 120, progress: 75 },
        { id: 2, subject: 'Physics', date: '2023-07-09', duration: 90, progress: 60 },
        { id: 3, subject: 'Literature', date: '2023-07-08', duration: 75, progress: 45 }
    ],
    habits: [
        { id: 1, name: 'Daily Reading', frequency: 'daily', streak: 5, lastCompleted: '2023-07-10' },
        { id: 2, name: 'Exercise', frequency: 'daily', streak: 4, lastCompleted: '2023-07-10' },
        { id: 3, name: 'Practice Coding', frequency: 'daily', streak: 7, lastCompleted: '2023-07-10' },
        { id: 4, name: 'Language Learning', frequency: 'daily', streak: 3, lastCompleted: '2023-07-09' }
    ]
};

// Initialize dashboard
function initDashboard() {
    console.log('Dashboard initialized');
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize dashboard charts
    initCharts();
    
    // Set up event listeners for dashboard interactions
    setupDashboardListeners();
}

// Load dashboard data
function loadDashboardData() {
    // In a real app, this would fetch data from an API or localStorage
    // For this demo, we're using the sample data above
    
    // Populate upcoming deadlines
    updateUpcomingDeadlines();
    
    // Populate study progress
    updateStudyProgress();
    
    // Populate habit streaks
    updateHabitStreaks();
    
    // Update summary stats
    updateSummaryStats();
}

// Update upcoming deadlines section
function updateUpcomingDeadlines() {
    const deadlineList = document.querySelector('.deadline-list');
    if (!deadlineList) return;
    
    // Clear existing content
    deadlineList.innerHTML = '';
    
    // Get incomplete tasks sorted by deadline
    const upcomingTasks = dashboardData.tasks
        .filter(task => !task.completed)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 3); // Limit to 3 tasks
    
    // Create list items
    upcomingTasks.forEach(task => {
        const li = document.createElement('li');
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'deadline-date';
        dateSpan.textContent = formatDeadlineDate(task.deadline);
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'deadline-title';
        titleSpan.textContent = task.title;
        
        const subjectSpan = document.createElement('span');
        subjectSpan.className = 'deadline-subject';
        subjectSpan.textContent = task.subject;
        
        li.appendChild(dateSpan);
        li.appendChild(titleSpan);
        li.appendChild(subjectSpan);
        
        deadlineList.appendChild(li);
    });
    
    // If no upcoming tasks, show message
    if (upcomingTasks.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No upcoming deadlines!';
        li.className = 'no-deadlines';
        deadlineList.appendChild(li);
    }
}

// Format deadline date to short format (e.g., "Jul 15")
function formatDeadlineDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
}

// Update study progress section
function updateStudyProgress() {
    const progressContainer = document.querySelector('.progress-container');
    if (!progressContainer) return;
    
    // Clear existing content
    progressContainer.innerHTML = '';
    
    // Get study sessions by subject
    const subjectProgress = {};
    dashboardData.studySessions.forEach(session => {
        if (!subjectProgress[session.subject]) {
            subjectProgress[session.subject] = session.progress;
        }
    });
    
    // Create progress bars
    for (const [subject, progress] of Object.entries(subjectProgress)) {
        const progressSubject = document.createElement('div');
        progressSubject.className = 'progress-subject';
        
        const subjectSpan = document.createElement('span');
        subjectSpan.textContent = subject;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        const progressFill = document.createElement('div');
        progressFill.className = 'progress';
        progressFill.style.width = `${progress}%`;
        
        const progressValue = document.createElement('span');
        progressValue.textContent = `${progress}%`;
        
        progressBar.appendChild(progressFill);
        
        progressSubject.appendChild(subjectSpan);
        progressSubject.appendChild(progressBar);
        progressSubject.appendChild(progressValue);
        
        progressContainer.appendChild(progressSubject);
    }
}

// Update habit streaks section
function updateHabitStreaks() {
    const habitStreaks = document.querySelector('.habit-streaks');
    if (!habitStreaks) return;
    
    // Clear existing content
    habitStreaks.innerHTML = '';
    
    // Sort habits by streak length (descending)
    const sortedHabits = [...dashboardData.habits].sort((a, b) => b.streak - a.streak);
    
    // Limit to top 2 habits
    const topHabits = sortedHabits.slice(0, 2);
    
    // Create habit streak elements
    topHabits.forEach(habit => {
        const habitStreak = document.createElement('div');
        habitStreak.className = 'habit-streak';
        
        const label = document.createElement('span');
        label.className = 'streak-label';
        label.textContent = habit.name;
        
        const days = document.createElement('div');
        days.className = 'streak-days';
        
        // Create day dots (last 7 days)
        for (let i = 0; i < 7; i++) {
            const day = document.createElement('span');
            day.className = 'day';
            
            // If within streak range, mark as active
            if (i < habit.streak) {
                day.classList.add('active');
            }
            
            days.appendChild(day);
        }
        
        const count = document.createElement('span');
        count.className = 'streak-count';
        count.textContent = `${habit.streak} days`;
        
        habitStreak.appendChild(label);
        habitStreak.appendChild(days);
        habitStreak.appendChild(count);
        
        habitStreaks.appendChild(habitStreak);
    });
}

// Update summary stats
function updateSummaryStats() {
    // Tasks count
    const tasksCount = dashboardData.tasks.filter(task => !task.completed).length;
    const tasksElement = document.querySelector('.summary-stats .stat:nth-child(1) .stat-value');
    if (tasksElement) {
        tasksElement.textContent = tasksCount;
    }
    
    // Study sessions count
    const todayDate = new Date().toISOString().split('T')[0];
    const studySessionsCount = dashboardData.studySessions.filter(
        session => session.date === todayDate
    ).length;
    const sessionsElement = document.querySelector('.summary-stats .stat:nth-child(2) .stat-value');
    if (sessionsElement) {
        sessionsElement.textContent = studySessionsCount;
    }
    
    // Habits count
    const completedHabits = dashboardData.habits.filter(
        habit => habit.lastCompleted === new Date().toISOString().split('T')[0]
    ).length;
    const totalHabits = dashboardData.habits.length;
    const habitsElement = document.querySelector('.summary-stats .stat:nth-child(3) .stat-value');
    if (habitsElement) {
        habitsElement.textContent = `${completedHabits}/${totalHabits}`;
    }
}

// Initialize dashboard charts
function initCharts() {
    // This would use Chart.js to create visual charts
    // For this demo, we'll leave it as a placeholder
    console.log('Charts would be initialized here');
}

// Set up event listeners
function setupDashboardListeners() {
    // Example: Add click handler for refreshing dashboard data
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Refresh';
        refreshButton.className = 'btn refresh-btn';
        refreshButton.style.position = 'absolute';
        refreshButton.style.top = '1rem';
        refreshButton.style.right = '1rem';
        refreshButton.addEventListener('click', loadDashboardData);
        
        const h2 = dashboard.querySelector('h2');
        if (h2) {
            h2.style.position = 'relative';
            h2.appendChild(refreshButton);
        }
    }
} 

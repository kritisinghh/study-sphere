/**
 * Study Planner Page
 * Auto-generates personalized study schedules based on subject priorities and deadlines
 */

// Sample data - would be loaded from backend or localStorage in a real app
const plannerData = {
    subjects: [
        { id: 1, name: 'Mathematics', priority: 5, difficulty: 4, color: '#4f46e5' },
        { id: 2, name: 'Physics', priority: 4, difficulty: 5, color: '#ef4444' },
        { id: 3, name: 'Literature', priority: 3, difficulty: 2, color: '#10b981' },
        { id: 4, name: 'Computer Science', priority: 5, difficulty: 3, color: '#f59e0b' },
        { id: 5, name: 'Chemistry', priority: 2, difficulty: 4, color: '#3b82f6' }
    ],
    tasks: [
        { 
            id: 1, 
            title: 'Math Assignment', 
            subject: 'Mathematics', 
            deadline: '2023-07-15', 
            estimatedTime: 120, 
            priority: 4,
            completed: false 
        },
        { 
            id: 2, 
            title: 'Physics Lab Report', 
            subject: 'Physics', 
            deadline: '2023-07-18', 
            estimatedTime: 180, 
            priority: 3,
            completed: false 
        },
        { 
            id: 3, 
            title: 'Term Paper', 
            subject: 'Literature', 
            deadline: '2023-07-22', 
            estimatedTime: 240, 
            priority: 5,
            completed: false 
        },
        { 
            id: 4, 
            title: 'CS Project', 
            subject: 'Computer Science', 
            deadline: '2023-07-25', 
            estimatedTime: 300, 
            priority: 4,
            completed: false 
        }
    ],
    availability: {
        monday: [
            { start: '09:00', end: '11:00' },
            { start: '14:00', end: '16:00' }
        ],
        tuesday: [
            { start: '10:00', end: '12:00' },
            { start: '15:00', end: '17:00' }
        ],
        wednesday: [
            { start: '09:00', end: '11:00' },
            { start: '14:00', end: '16:00' }
        ],
        thursday: [
            { start: '10:00', end: '12:00' },
            { start: '15:00', end: '17:00' }
        ],
        friday: [
            { start: '09:00', end: '11:00' },
            { start: '14:00', end: '16:00' }
        ],
        saturday: [
            { start: '10:00', end: '15:00' }
        ],
        sunday: [
            { start: '13:00', end: '16:00' }
        ]
    },
    preferences: {
        breakDuration: 15, // minutes
        sessionDuration: 50, // minutes
        preferredSubjects: [1, 4] // Subject IDs
    }
};

// Initialize the study planner
function initPlanner() {
    console.log('Planner initialized');
    
    // Build planner UI
    buildPlannerUI();
    
    // Generate schedule
    generateSchedule();
    
    // Set up event listeners
    setupPlannerListeners();
}

// Build the planner UI
function buildPlannerUI() {
    const plannerPage = document.getElementById('planner');
    if (!plannerPage) return;
    
    // Clear existing content
    plannerPage.innerHTML = '';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Study Planner';
    plannerPage.appendChild(title);
    
    // Create container
    const container = document.createElement('div');
    container.className = 'planner-container';
    
    // Create left column (settings and tasks)
    const leftColumn = document.createElement('div');
    leftColumn.className = 'planner-left';
    
    // Add settings section
    const settingsCard = createSettingsCard();
    leftColumn.appendChild(settingsCard);
    
    // Add tasks section
    const tasksCard = createTasksCard();
    leftColumn.appendChild(tasksCard);
    
    // Create right column (schedule)
    const rightColumn = document.createElement('div');
    rightColumn.className = 'planner-right';
    
    // Add schedule section
    const scheduleCard = createScheduleCard();
    rightColumn.appendChild(scheduleCard);
    
    // Add columns to container
    container.appendChild(leftColumn);
    container.appendChild(rightColumn);
    
    // Add container to page
    plannerPage.appendChild(container);
    
    // Add CSS for planner
    addPlannerStyles();
}

// Create settings card
function createSettingsCard() {
    const card = document.createElement('div');
    card.className = 'card settings-card';
    
    const cardHeader = document.createElement('h3');
    cardHeader.textContent = 'Settings';
    card.appendChild(cardHeader);
    
    const form = document.createElement('form');
    form.id = 'planner-settings';
    
    // Add break duration input
    const breakGroup = document.createElement('div');
    breakGroup.className = 'form-group';
    
    const breakLabel = document.createElement('label');
    breakLabel.htmlFor = 'break-duration';
    breakLabel.textContent = 'Break Duration (minutes)';
    
    const breakInput = document.createElement('input');
    breakInput.type = 'number';
    breakInput.id = 'break-duration';
    breakInput.min = '5';
    breakInput.max = '30';
    breakInput.step = '5';
    breakInput.value = plannerData.preferences.breakDuration;
    
    breakGroup.appendChild(breakLabel);
    breakGroup.appendChild(breakInput);
    form.appendChild(breakGroup);
    
    // Add session duration input
    const sessionGroup = document.createElement('div');
    sessionGroup.className = 'form-group';
    
    const sessionLabel = document.createElement('label');
    sessionLabel.htmlFor = 'session-duration';
    sessionLabel.textContent = 'Session Duration (minutes)';
    
    const sessionInput = document.createElement('input');
    sessionInput.type = 'number';
    sessionInput.id = 'session-duration';
    sessionInput.min = '25';
    sessionInput.max = '120';
    sessionInput.step = '5';
    sessionInput.value = plannerData.preferences.sessionDuration;
    
    sessionGroup.appendChild(sessionLabel);
    sessionGroup.appendChild(sessionInput);
    form.appendChild(sessionGroup);
    
    // Add preferred subjects select
    const subjectsGroup = document.createElement('div');
    subjectsGroup.className = 'form-group';
    
    const subjectsLabel = document.createElement('label');
    subjectsLabel.htmlFor = 'preferred-subjects';
    subjectsLabel.textContent = 'Preferred Subjects';
    
    const subjectsSelect = document.createElement('select');
    subjectsSelect.id = 'preferred-subjects';
    subjectsSelect.multiple = true;
    
    plannerData.subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.id;
        option.textContent = subject.name;
        option.selected = plannerData.preferences.preferredSubjects.includes(subject.id);
        subjectsSelect.appendChild(option);
    });
    
    subjectsGroup.appendChild(subjectsLabel);
    subjectsGroup.appendChild(subjectsSelect);
    form.appendChild(subjectsGroup);
    
    // Add generate button
    const generateBtn = document.createElement('button');
    generateBtn.type = 'button';
    generateBtn.className = 'btn';
    generateBtn.id = 'generate-schedule';
    generateBtn.textContent = 'Generate Schedule';
    form.appendChild(generateBtn);
    
    card.appendChild(form);
    return card;
}

// Create tasks card
function createTasksCard() {
    const card = document.createElement('div');
    card.className = 'card tasks-card';
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = 'Tasks';
    
    const addTaskBtn = document.createElement('button');
    addTaskBtn.className = 'btn btn-small';
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.id = 'add-task-btn';
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(addTaskBtn);
    card.appendChild(cardHeader);
    
    const tasksList = document.createElement('ul');
    tasksList.className = 'tasks-list';
    
    // Add tasks to list
    plannerData.tasks.forEach(task => {
        const taskItem = createTaskItem(task);
        tasksList.appendChild(taskItem);
    });
    
    card.appendChild(tasksList);
    return card;
}

// Create task item
function createTaskItem(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.taskId = task.id;
    
    // Find subject color
    const subject = plannerData.subjects.find(s => s.name === task.subject);
    const subjectColor = subject ? subject.color : '#6b7280';
    
    // Add color indicator
    const colorIndicator = document.createElement('div');
    colorIndicator.className = 'task-color-indicator';
    colorIndicator.style.backgroundColor = subjectColor;
    li.appendChild(colorIndicator);
    
    // Add task content
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    
    const taskTitle = document.createElement('div');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.title;
    
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    taskDetails.innerHTML = `
        <span class="task-subject">${task.subject}</span>
        <span class="task-deadline">Due: ${formatDate(task.deadline)}</span>
        <span class="task-time">${task.estimatedTime} min</span>
    `;
    
    taskContent.appendChild(taskTitle);
    taskContent.appendChild(taskDetails);
    li.appendChild(taskContent);
    
    // Add actions
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'task-edit';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener('click', () => editTask(task.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    taskActions.appendChild(editBtn);
    taskActions.appendChild(deleteBtn);
    li.appendChild(taskActions);
    
    return li;
}

// Create schedule card
function createScheduleCard() {
    const card = document.createElement('div');
    card.className = 'card schedule-card';
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = 'Your Study Schedule';
    
    const dateSelector = document.createElement('div');
    dateSelector.className = 'date-selector';
    
    // Add date navigation
    const prevBtn = document.createElement('button');
    prevBtn.className = 'date-nav prev';
    prevBtn.innerHTML = '&laquo;';
    prevBtn.id = 'prev-day';
    
    const dateDisplay = document.createElement('span');
    dateDisplay.className = 'current-date';
    dateDisplay.textContent = formatDate(new Date().toISOString());
    dateDisplay.id = 'current-date';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'date-nav next';
    nextBtn.innerHTML = '&raquo;';
    nextBtn.id = 'next-day';
    
    dateSelector.appendChild(prevBtn);
    dateSelector.appendChild(dateDisplay);
    dateSelector.appendChild(nextBtn);
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(dateSelector);
    card.appendChild(cardHeader);
    
    // Schedule content
    const scheduleContent = document.createElement('div');
    scheduleContent.className = 'schedule-content';
    scheduleContent.id = 'schedule-content';
    card.appendChild(scheduleContent);
    
    return card;
}

// Generate schedule
function generateSchedule() {
    const scheduleContent = document.getElementById('schedule-content');
    if (!scheduleContent) return;
    
    // Clear schedule content
    scheduleContent.innerHTML = '';
    
    // Get current day
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    const dayName = days[today];
    
    // Get time slots for today
    const timeSlots = plannerData.availability[dayName];
    
    if (!timeSlots || timeSlots.length === 0) {
        const noSchedule = document.createElement('div');
        noSchedule.className = 'no-schedule';
        noSchedule.textContent = 'No study time scheduled for today.';
        scheduleContent.appendChild(noSchedule);
        return;
    }
    
    // Generate schedule for each time slot
    timeSlots.forEach((slot, index) => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        
        const timeHeader = document.createElement('div');
        timeHeader.className = 'time-header';
        timeHeader.textContent = `${slot.start} - ${slot.end}`;
        timeSlot.appendChild(timeHeader);
        
        // Calculate total available minutes
        const startTime = parseTime(slot.start);
        const endTime = parseTime(slot.end);
        const totalMinutes = (endTime.hour - startTime.hour) * 60 + (endTime.minute - startTime.minute);
        
        // Get session and break durations
        const sessionDuration = plannerData.preferences.sessionDuration;
        const breakDuration = plannerData.preferences.breakDuration;
        
        // Calculate how many full sessions we can fit
        const sessions = Math.floor(totalMinutes / (sessionDuration + breakDuration));
        const remainingTime = totalMinutes % (sessionDuration + breakDuration);
        
        // Sort tasks by priority and deadline
        const sortedTasks = [...plannerData.tasks]
            .filter(task => !task.completed)
            .sort((a, b) => {
                if (a.priority !== b.priority) {
                    return b.priority - a.priority; // Higher priority first
                }
                return new Date(a.deadline) - new Date(b.deadline); // Earlier deadline first
            });
        
        // Generate sessions
        let currentTime = { ...startTime };
        for (let i = 0; i < sessions; i++) {
            const sessionTask = sortedTasks[i % sortedTasks.length]; // Cycle through tasks
            
            // Create session element
            const session = document.createElement('div');
            session.className = 'study-session';
            
            // Find subject color
            const subject = plannerData.subjects.find(s => s.name === sessionTask.subject);
            const subjectColor = subject ? subject.color : '#6b7280';
            session.style.borderLeft = `4px solid ${subjectColor}`;
            
            // Calculate session time
            const sessionStart = formatTimeObj(currentTime);
            addMinutes(currentTime, sessionDuration);
            const sessionEnd = formatTimeObj(currentTime);
            
            session.innerHTML = `
                <div class="session-time">${sessionStart} - ${sessionEnd}</div>
                <div class="session-subject">${sessionTask.subject}</div>
                <div class="session-task">${sessionTask.title}</div>
            `;
            
            timeSlot.appendChild(session);
            
            // Add break if not the last session
            if (i < sessions - 1) {
                const breakEl = document.createElement('div');
                breakEl.className = 'study-break';
                
                // Calculate break time
                const breakStart = sessionEnd;
                addMinutes(currentTime, breakDuration);
                const breakEnd = formatTimeObj(currentTime);
                
                breakEl.innerHTML = `
                    <div class="break-time">${breakStart} - ${breakEnd}</div>
                    <div class="break-label">Break</div>
                `;
                
                timeSlot.appendChild(breakEl);
            }
        }
        
        // Add remaining time if significant
        if (remainingTime >= 15) {
            const remainingSession = document.createElement('div');
            remainingSession.className = 'study-session remaining';
            
            const sessionStart = formatTimeObj(currentTime);
            addMinutes(currentTime, remainingTime);
            const sessionEnd = formatTimeObj(currentTime);
            
            // Use next task in rotation
            const sessionTask = sortedTasks[sessions % sortedTasks.length];
            
            // Find subject color
            const subject = plannerData.subjects.find(s => s.name === sessionTask.subject);
            const subjectColor = subject ? subject.color : '#6b7280';
            remainingSession.style.borderLeft = `4px solid ${subjectColor}`;
            
            remainingSession.innerHTML = `
                <div class="session-time">${sessionStart} - ${sessionEnd}</div>
                <div class="session-subject">${sessionTask.subject}</div>
                <div class="session-task">${sessionTask.title}</div>
                <div class="session-note">Shorter session (${remainingTime} min)</div>
            `;
            
            timeSlot.appendChild(remainingSession);
        }
        
        scheduleContent.appendChild(timeSlot);
    });
}

// Helper function to parse time string (e.g., "09:00")
function parseTime(timeStr) {
    const [hour, minute] = timeStr.split(':').map(Number);
    return { hour, minute };
}

// Helper function to format time object to string
function formatTimeObj(timeObj) {
    const hour = timeObj.hour.toString().padStart(2, '0');
    const minute = timeObj.minute.toString().padStart(2, '0');
    return `${hour}:${minute}`;
}

// Helper function to add minutes to a time object
function addMinutes(timeObj, minutes) {
    timeObj.minute += minutes;
    while (timeObj.minute >= 60) {
        timeObj.hour += 1;
        timeObj.minute -= 60;
    }
    return timeObj;
}

// Format date
function formatDate(dateStr) {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}

// Setup event listeners for planner
function setupPlannerListeners() {
    // Generate schedule button
    const generateBtn = document.getElementById('generate-schedule');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerateSchedule);
    }
    
    // Date navigation
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    
    if (prevDayBtn) {
        prevDayBtn.addEventListener('click', () => changeDate(-1));
    }
    
    if (nextDayBtn) {
        nextDayBtn.addEventListener('click', () => changeDate(1));
    }
    
    // Add task button
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', showAddTaskForm);
    }
}

// Handle generate schedule
function handleGenerateSchedule() {
    // Update preferences from form
    const breakDuration = parseInt(document.getElementById('break-duration').value);
    const sessionDuration = parseInt(document.getElementById('session-duration').value);
    
    const preferredSubjectsSelect = document.getElementById('preferred-subjects');
    const preferredSubjects = Array.from(preferredSubjectsSelect.selectedOptions).map(option => parseInt(option.value));
    
    plannerData.preferences = {
        breakDuration,
        sessionDuration,
        preferredSubjects
    };
    
    // Regenerate schedule
    generateSchedule();
    
    // Show notification
    showNotification('Schedule generated successfully!', 'success');
}

// Change date
function changeDate(offset) {
    const currentDateEl = document.getElementById('current-date');
    if (!currentDateEl) return;
    
    // Parse current date
    const currentDate = new Date(currentDateEl.textContent);
    
    // Add offset days
    currentDate.setDate(currentDate.getDate() + offset);
    
    // Update display
    currentDateEl.textContent = formatDate(currentDate.toISOString());
    
    // Regenerate schedule for new date
    generateSchedule();
}

// Show add task form
function showAddTaskForm() {
    console.log('Add task form would be shown here');
    // In a real app, this would show a modal form to add a new task
}

// Edit task
function editTask(taskId) {
    console.log(`Edit task ${taskId}`);
    // In a real app, this would show a modal form to edit the task
}

// Delete task
function deleteTask(taskId) {
    console.log(`Delete task ${taskId}`);
    // In a real app, this would show a confirmation dialog and then delete the task
}

// Add planner specific styles
function addPlannerStyles() {
    // Check if styles already exist
    if (document.getElementById('planner-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'planner-styles';
    styleEl.textContent = `
        .planner-container {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        
        .planner-left {
            flex: 1;
            min-width: 300px;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .planner-right {
            flex: 2;
            min-width: 400px;
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .btn-small {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
        }
        
        .tasks-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .task-item {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            background-color: var(--light);
            border-radius: var(--border-radius);
            gap: 0.75rem;
        }
        
        .task-color-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        
        .task-content {
            flex: 1;
        }
        
        .task-title {
            font-weight: 500;
        }
        
        .task-details {
            font-size: 0.875rem;
            color: var(--gray);
            display: flex;
            gap: 1rem;
            margin-top: 0.25rem;
        }
        
        .task-actions {
            display: flex;
            gap: 0.5rem;
        }
        
        .task-edit, .task-delete {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--gray);
            transition: var(--transition);
        }
        
        .task-edit:hover {
            color: var(--primary);
        }
        
        .task-delete:hover {
            color: var(--danger);
        }
        
        .date-selector {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .date-nav {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.25rem;
            color: var(--primary);
        }
        
        .current-date {
            font-weight: 500;
        }
        
        .time-slot {
            margin-bottom: 1.5rem;
            border: 1px solid var(--gray-light);
            border-radius: var(--border-radius);
            overflow: hidden;
        }
        
        .time-header {
            background-color: var(--gray-light);
            padding: 0.5rem 1rem;
            font-weight: 500;
        }
        
        .study-session {
            padding: 1rem;
            border-bottom: 1px solid var(--gray-light);
            background-color: white;
        }
        
        .session-time {
            font-weight: 500;
        }
        
        .session-subject {
            color: var(--gray);
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .session-task {
            margin-top: 0.25rem;
        }
        
        .session-note {
            font-size: 0.75rem;
            color: var(--gray);
            margin-top: 0.5rem;
            font-style: italic;
        }
        
        .study-break {
            padding: 0.5rem 1rem;
            background-color: #f9fafb;
            border-bottom: 1px solid var(--gray-light);
            display: flex;
            justify-content: space-between;
            color: var(--gray);
            font-size: 0.875rem;
        }
        
        .no-schedule {
            padding: 2rem;
            text-align: center;
            color: var(--gray);
        }
        
        @media (max-width: 768px) {
            .planner-container {
                flex-direction: column;
            }
            
            .task-details {
                flex-direction: column;
                gap: 0.25rem;
            }
        }
    `;
    
    document.head.appendChild(styleEl);
} 

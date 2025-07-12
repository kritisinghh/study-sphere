/**
 * Habits Tracker Page
 * Track micro-habits with streak visualization
 */

// Sample data - would be loaded from backend or localStorage in a real app
const habitsData = {
    habits: [
        { 
            id: 1, 
            name: 'Daily Reading', 
            description: 'Read for at least 30 minutes',
            frequency: 'daily', 
            streak: 5, 
            lastCompleted: '2023-07-10',
            history: [
                { date: '2023-07-06', completed: true },
                { date: '2023-07-07', completed: true },
                { date: '2023-07-08', completed: true },
                { date: '2023-07-09', completed: true },
                { date: '2023-07-10', completed: true },
                { date: '2023-07-11', completed: false }
            ]
        },
        { 
            id: 2, 
            name: 'Exercise', 
            description: 'At least 20 minutes of physical activity',
            frequency: 'daily', 
            streak: 4, 
            lastCompleted: '2023-07-10',
            history: [
                { date: '2023-07-05', completed: false },
                { date: '2023-07-06', completed: false },
                { date: '2023-07-07', completed: true },
                { date: '2023-07-08', completed: true },
                { date: '2023-07-09', completed: true },
                { date: '2023-07-10', completed: true }
            ]
        },
        { 
            id: 3, 
            name: 'Practice Coding', 
            description: 'Solve at least one programming problem',
            frequency: 'daily', 
            streak: 7, 
            lastCompleted: '2023-07-10',
            history: [
                { date: '2023-07-04', completed: true },
                { date: '2023-07-05', completed: true },
                { date: '2023-07-06', completed: true },
                { date: '2023-07-07', completed: true },
                { date: '2023-07-08', completed: true },
                { date: '2023-07-09', completed: true },
                { date: '2023-07-10', completed: true }
            ]
        },
        { 
            id: 4, 
            name: 'Language Learning', 
            description: 'Learn 5 new vocabulary words',
            frequency: 'daily', 
            streak: 3, 
            lastCompleted: '2023-07-09',
            history: [
                { date: '2023-07-05', completed: false },
                { date: '2023-07-06', completed: false },
                { date: '2023-07-07', completed: true },
                { date: '2023-07-08', completed: true },
                { date: '2023-07-09', completed: true },
                { date: '2023-07-10', completed: false }
            ]
        }
    ]
};

// Initialize habits tracker
function initHabits() {
    console.log('Habits tracker initialized');
    
    // Build habits UI
    buildHabitsUI();
    
    // Set up event listeners
    setupHabitsListeners();
}

// Build the habits tracker UI
function buildHabitsUI() {
    const habitsPage = document.getElementById('habits');
    if (!habitsPage) return;
    
    // Clear existing content
    habitsPage.innerHTML = '';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Habit Tracker';
    habitsPage.appendChild(title);
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'habits-container';
    
    // Create stats section
    const statsSection = createStatsSection();
    container.appendChild(statsSection);
    
    // Create habits list section
    const habitsSection = createHabitsSection();
    container.appendChild(habitsSection);
    
    // Add container to page
    habitsPage.appendChild(container);
    
    // Add CSS for habits page
    addHabitsStyles();
}

// Create stats section
function createStatsSection() {
    const statsSection = document.createElement('div');
    statsSection.className = 'habits-stats';
    
    // Create stats cards
    const totalHabits = habitsData.habits.length;
    const activeStreaks = habitsData.habits.filter(habit => habit.streak > 0).length;
    const completedToday = habitsData.habits.filter(
        habit => habit.lastCompleted === new Date().toISOString().split('T')[0]
    ).length;
    
    // Total habits card
    const totalCard = document.createElement('div');
    totalCard.className = 'card stats-card';
    totalCard.innerHTML = `
        <div class="stat-value">${totalHabits}</div>
        <div class="stat-label">Total Habits</div>
    `;
    statsSection.appendChild(totalCard);
    
    // Active streaks card
    const streaksCard = document.createElement('div');
    streaksCard.className = 'card stats-card';
    streaksCard.innerHTML = `
        <div class="stat-value">${activeStreaks}</div>
        <div class="stat-label">Active Streaks</div>
    `;
    statsSection.appendChild(streaksCard);
    
    // Completed today card
    const completedCard = document.createElement('div');
    completedCard.className = 'card stats-card';
    completedCard.innerHTML = `
        <div class="stat-value">${completedToday}/${totalHabits}</div>
        <div class="stat-label">Completed Today</div>
    `;
    statsSection.appendChild(completedCard);
    
    // Find longest streak
    const longestStreak = Math.max(...habitsData.habits.map(habit => habit.streak));
    const longestStreakHabit = habitsData.habits.find(habit => habit.streak === longestStreak);
    
    // Longest streak card
    const longestCard = document.createElement('div');
    longestCard.className = 'card stats-card';
    longestCard.innerHTML = `
        <div class="stat-value">${longestStreak} days</div>
        <div class="stat-label">Longest Streak</div>
        <div class="stat-subtitle">${longestStreakHabit ? longestStreakHabit.name : ''}</div>
    `;
    statsSection.appendChild(longestCard);
    
    return statsSection;
}

// Create habits section
function createHabitsSection() {
    const habitsSection = document.createElement('div');
    habitsSection.className = 'habits-list-section';
    
    // Create header with title and add button
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = 'Your Habits';
    
    const addButton = document.createElement('button');
    addButton.className = 'btn';
    addButton.id = 'add-habit-btn';
    addButton.innerHTML = '<i class="fas fa-plus"></i> Add Habit';
    
    sectionHeader.appendChild(sectionTitle);
    sectionHeader.appendChild(addButton);
    habitsSection.appendChild(sectionHeader);
    
    // Create habits list
    const habitsList = document.createElement('div');
    habitsList.className = 'habits-list';
    
    // Add each habit to the list
    habitsData.habits.forEach(habit => {
        const habitCard = createHabitCard(habit);
        habitsList.appendChild(habitCard);
    });
    
    habitsSection.appendChild(habitsList);
    return habitsSection;
}

// Create individual habit card
function createHabitCard(habit) {
    const card = document.createElement('div');
    card.className = 'card habit-card';
    card.dataset.habitId = habit.id;
    
    // Habit header
    const habitHeader = document.createElement('div');
    habitHeader.className = 'habit-header';
    
    const habitName = document.createElement('h4');
    habitName.className = 'habit-name';
    habitName.textContent = habit.name;
    
    const habitMenu = document.createElement('div');
    habitMenu.className = 'habit-menu';
    habitMenu.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    
    habitHeader.appendChild(habitName);
    habitHeader.appendChild(habitMenu);
    card.appendChild(habitHeader);
    
    // Habit description
    const description = document.createElement('p');
    description.className = 'habit-description';
    description.textContent = habit.description;
    card.appendChild(description);
    
    // Streak visualization
    const streakViz = document.createElement('div');
    streakViz.className = 'streak-visualization';
    
    // Get last 14 days
    const today = new Date();
    const last14Days = [];
    
    for (let i = 13; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Find if there's a history entry for this date
        const historyEntry = habit.history.find(h => h.date === dateStr);
        
        last14Days.push({
            date: dateStr,
            day: date.getDate(),
            completed: historyEntry ? historyEntry.completed : false
        });
    }
    
    // Create streak calendar
    const streakCalendar = document.createElement('div');
    streakCalendar.className = 'streak-calendar';
    
    last14Days.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.className = `calendar-day ${day.completed ? 'completed' : ''}`;
        dayEl.title = `${new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}${day.completed ? ' - Completed' : ' - Not completed'}`;
        
        const dayNum = document.createElement('span');
        dayNum.className = 'day-number';
        dayNum.textContent = day.day;
        
        dayEl.appendChild(dayNum);
        streakCalendar.appendChild(dayEl);
    });
    
    streakViz.appendChild(streakCalendar);
    
    // Current streak
    const streakInfo = document.createElement('div');
    streakInfo.className = 'streak-info';
    streakInfo.innerHTML = `
        <div class="current-streak">
            <span class="streak-number">${habit.streak}</span>
            <span class="streak-label">day${habit.streak !== 1 ? 's' : ''} streak</span>
        </div>
    `;
    
    streakViz.appendChild(streakInfo);
    card.appendChild(streakViz);
    
    // Action button
    const isToday = habit.lastCompleted === new Date().toISOString().split('T')[0];
    const actionBtn = document.createElement('button');
    actionBtn.className = `habit-action-btn ${isToday ? 'completed' : ''}`;
    actionBtn.textContent = isToday ? 'Completed Today' : 'Mark as Complete';
    actionBtn.addEventListener('click', (e) => toggleHabitCompletion(habit.id, e));
    card.appendChild(actionBtn);
    
    return card;
}

// Toggle habit completion
function toggleHabitCompletion(habitId, event) {
    // Find the habit
    const habit = habitsData.habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const today = new Date().toISOString().split('T')[0];
    const isCompleted = habit.lastCompleted === today;
    
    if (isCompleted) {
        // Undo completion
        habit.lastCompleted = '';
        habit.streak -= 1;
        
        // Update history
        const todayHistoryEntry = habit.history.find(h => h.date === today);
        if (todayHistoryEntry) {
            todayHistoryEntry.completed = false;
        } else {
            habit.history.push({ date: today, completed: false });
        }
        
        // Update button
        event.target.textContent = 'Mark as Complete';
        event.target.classList.remove('completed');
        
    } else {
        // Mark as completed
        habit.lastCompleted = today;
        habit.streak += 1;
        
        // Update history
        const todayHistoryEntry = habit.history.find(h => h.date === today);
        if (todayHistoryEntry) {
            todayHistoryEntry.completed = true;
        } else {
            habit.history.push({ date: today, completed: true });
        }
        
        // Update button
        event.target.textContent = 'Completed Today';
        event.target.classList.add('completed');
    }
    
    // Update UI
    const habitCard = event.target.closest('.habit-card');
    const streakNumber = habitCard.querySelector('.streak-number');
    if (streakNumber) {
        streakNumber.textContent = habit.streak;
        habitCard.querySelector('.streak-label').textContent = `day${habit.streak !== 1 ? 's' : ''} streak`;
    }
    
    // Update calendar
    const today = new Date().getDate();
    const todayEl = Array.from(habitCard.querySelectorAll('.calendar-day'))
        .find(day => day.querySelector('.day-number').textContent == today);
    
    if (todayEl) {
        if (isCompleted) {
            todayEl.classList.remove('completed');
            todayEl.title = `${new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - Not completed`;
        } else {
            todayEl.classList.add('completed');
            todayEl.title = `${new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - Completed`;
        }
    }
    
    // Update stats
    updateHabitStats();
    
    // Save data (in a real app)
    // saveHabitsData();
}

// Update habit stats
function updateHabitStats() {
    // Get updated stats
    const totalHabits = habitsData.habits.length;
    const activeStreaks = habitsData.habits.filter(habit => habit.streak > 0).length;
    const completedToday = habitsData.habits.filter(
        habit => habit.lastCompleted === new Date().toISOString().split('T')[0]
    ).length;
    
    // Update stats cards
    const statsCards = document.querySelectorAll('.stats-card');
    
    // Update completed today card
    const completedCard = statsCards[2]; // Third card
    if (completedCard) {
        completedCard.querySelector('.stat-value').textContent = `${completedToday}/${totalHabits}`;
    }
    
    // Update active streaks
    const streaksCard = statsCards[1]; // Second card
    if (streaksCard) {
        streaksCard.querySelector('.stat-value').textContent = activeStreaks;
    }
    
    // Find longest streak
    const longestStreak = Math.max(...habitsData.habits.map(habit => habit.streak));
    const longestStreakHabit = habitsData.habits.find(habit => habit.streak === longestStreak);
    
    // Update longest streak card
    const longestCard = statsCards[3]; // Fourth card
    if (longestCard) {
        longestCard.querySelector('.stat-value').textContent = `${longestStreak} days`;
        if (longestStreakHabit) {
            longestCard.querySelector('.stat-subtitle').textContent = longestStreakHabit.name;
        }
    }
}

// Set up event listeners for the habits page
function setupHabitsListeners() {
    // Add new habit button
    const addHabitBtn = document.getElementById('add-habit-btn');
    if (addHabitBtn) {
        addHabitBtn.addEventListener('click', showAddHabitModal);
    }
    
    // Habit menu buttons
    const habitMenus = document.querySelectorAll('.habit-menu');
    habitMenus.forEach(menu => {
        menu.addEventListener('click', toggleHabitMenu);
    });
}

// Show add habit modal
function showAddHabitModal() {
    console.log('Show add habit modal');
    // In a real app, this would show a modal to add a new habit
}

// Toggle habit menu
function toggleHabitMenu(e) {
    console.log('Toggle habit menu');
    
    // Get habit card
    const habitCard = e.target.closest('.habit-card');
    const habitId = parseInt(habitCard.dataset.habitId);
    
    // Create menu if it doesn't exist
    let menu = document.querySelector('.habit-dropdown-menu');
    if (!menu) {
        menu = document.createElement('div');
        menu.className = 'habit-dropdown-menu';
        menu.innerHTML = `
            <ul>
                <li class="edit-habit">Edit</li>
                <li class="reset-streak">Reset Streak</li>
                <li class="delete-habit">Delete</li>
            </ul>
        `;
        document.body.appendChild(menu);
        
        // Add event listeners to menu items
        menu.querySelector('.edit-habit').addEventListener('click', () => {
            editHabit(habitId);
            hideHabitMenu();
        });
        
        menu.querySelector('.reset-streak').addEventListener('click', () => {
            resetHabitStreak(habitId);
            hideHabitMenu();
        });
        
        menu.querySelector('.delete-habit').addEventListener('click', () => {
            deleteHabit(habitId);
            hideHabitMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !event.target.closest('.habit-menu')) {
                hideHabitMenu();
            }
        });
    }
    
    // Position menu next to the clicked button
    const rect = e.target.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX - 100}px`;
    menu.dataset.habitId = habitId;
    
    // Show menu
    menu.classList.add('active');
}

// Hide habit menu
function hideHabitMenu() {
    const menu = document.querySelector('.habit-dropdown-menu');
    if (menu) {
        menu.classList.remove('active');
    }
}

// Edit habit
function editHabit(habitId) {
    console.log(`Edit habit ${habitId}`);
    // In a real app, this would show a modal to edit the habit
}

// Reset habit streak
function resetHabitStreak(habitId) {
    // Find habit
    const habit = habitsData.habits.find(h => h.id === habitId);
    if (!habit) return;
    
    // Reset streak
    habit.streak = 0;
    
    // Update UI
    buildHabitsUI(); // Rebuild UI with updated data
    
    // Show notification
    showNotification('Streak has been reset', 'info');
}

// Delete habit
function deleteHabit(habitId) {
    console.log(`Delete habit ${habitId}`);
    // In a real app, this would show a confirmation dialog and then delete the habit
}

// Add habits specific styles
function addHabitsStyles() {
    // Check if styles already exist
    if (document.getElementById('habits-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'habits-styles';
    styleEl.textContent = `
        .habits-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .habits-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .stats-card {
            text-align: center;
            padding: 1.5rem;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .stat-label {
            margin-top: 0.5rem;
            color: var(--gray);
            font-size: 0.875rem;
        }
        
        .stat-subtitle {
            margin-top: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .habits-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        .habit-card {
            position: relative;
            transition: var(--transition);
        }
        
        .habit-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }
        
        .habit-name {
            margin: 0;
            font-size: 1.25rem;
        }
        
        .habit-menu {
            cursor: pointer;
            padding: 0.5rem;
            color: var(--gray);
        }
        
        .habit-menu:hover {
            color: var(--dark);
        }
        
        .habit-description {
            margin-bottom: 1rem;
            color: var(--gray);
            font-size: 0.875rem;
        }
        
        .streak-visualization {
            margin: 1rem 0;
        }
        
        .streak-calendar {
            display: grid;
            grid-template-columns: repeat(14, 1fr);
            gap: 2px;
            margin-bottom: 1rem;
        }
        
        .calendar-day {
            aspect-ratio: 1/1;
            background-color: var(--gray-light);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.75rem;
            position: relative;
        }
        
        .calendar-day.completed {
            background-color: var(--primary);
            color: white;
        }
        
        .day-number {
            opacity: 0.7;
            font-size: 0.625rem;
        }
        
        .streak-info {
            text-align: center;
            margin-top: 0.75rem;
        }
        
        .current-streak {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .streak-number {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .streak-label {
            color: var(--gray);
            font-size: 0.875rem;
        }
        
        .habit-action-btn {
            width: 100%;
            padding: 0.75rem;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .habit-action-btn:hover {
            background-color: var(--primary-light);
        }
        
        .habit-action-btn.completed {
            background-color: var(--success);
        }
        
        .habit-action-btn.completed:hover {
            background-color: #0ea271;
        }
        
        .habit-dropdown-menu {
            position: absolute;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            width: 120px;
            z-index: 100;
            display: none;
            overflow: hidden;
        }
        
        .habit-dropdown-menu.active {
            display: block;
        }
        
        .habit-dropdown-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .habit-dropdown-menu li {
            padding: 0.75rem 1rem;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .habit-dropdown-menu li:hover {
            background-color: var(--gray-light);
        }
        
        .delete-habit {
            color: var(--danger);
        }
        
        @media (max-width: 768px) {
            .habits-stats {
                grid-template-columns: 1fr 1fr;
            }
            
            .habits-list {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(styleEl);
} 

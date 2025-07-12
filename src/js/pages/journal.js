/**
 * Journal Page
 * Personal encrypted journal with mood tracking
 */

// Sample data - would be loaded from backend or localStorage in a real app
let journalData = {
    password: '', // Would be set by user during setup
    isSetup: false,
    entries: [
        {
            id: 1,
            date: '2023-07-10T14:30:00Z',
            title: 'First Day of Summer Classes',
            content: 'Today was the first day of my summer classes. I\'m taking Calculus II and Physics I. Both professors seem knowledgeable, but I\'m a bit worried about the workload.',
            mood: 'neutral',
            tags: ['classes', 'summer', 'calculus', 'physics']
        },
        {
            id: 2,
            date: '2023-07-08T20:15:00Z',
            title: 'Study Session with Friends',
            content: 'Had a great study session with Alex and Jamie. We covered most of the material for the upcoming test. I feel more confident now.',
            mood: 'happy',
            tags: ['study', 'friends', 'test-prep']
        },
        {
            id: 3,
            date: '2023-07-05T18:45:00Z',
            title: 'Project Deadline Stress',
            content: 'I\'m really stressed about the project deadline next week. Still have a lot to complete and not sure if I\'ll make it on time.',
            mood: 'stressed',
            tags: ['project', 'deadline', 'stress']
        }
    ]
};

// Initialize journal
function initJournal() {
    console.log('Journal initialized');
    
    // Check if journal is set up (has password)
    if (!journalData.isSetup) {
        showJournalSetup();
    } else {
        showJournalLogin();
    }
    
    // Set up event listeners
    setupJournalListeners();
}

// Build the journal UI
function buildJournalUI() {
    const journalPage = document.getElementById('journal');
    if (!journalPage) return;
    
    // Clear existing content
    journalPage.innerHTML = '';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Personal Journal';
    journalPage.appendChild(title);
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'journal-container';
    
    // Create sidebar (entries list)
    const sidebar = createJournalSidebar();
    container.appendChild(sidebar);
    
    // Create main content area
    const contentArea = createJournalContentArea();
    container.appendChild(contentArea);
    
    // Add container to page
    journalPage.appendChild(container);
    
    // Add CSS for journal
    addJournalStyles();
    
    // Load the most recent entry by default
    if (journalData.entries.length > 0) {
        const latestEntry = journalData.entries.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        )[0];
        
        loadJournalEntry(latestEntry.id);
    }
}

// Create journal sidebar
function createJournalSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'journal-sidebar';
    
    // Add new entry button
    const newEntryBtn = document.createElement('button');
    newEntryBtn.className = 'btn new-entry-btn';
    newEntryBtn.innerHTML = '<i class="fas fa-plus"></i> New Entry';
    newEntryBtn.addEventListener('click', createNewEntry);
    sidebar.appendChild(newEntryBtn);
    
    // Add search box
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search entries...';
    searchInput.id = 'journal-search';
    
    searchBox.appendChild(searchInput);
    sidebar.appendChild(searchBox);
    
    // Add entries list
    const entriesList = document.createElement('div');
    entriesList.className = 'entries-list';
    entriesList.id = 'entries-list';
    
    // Sort entries by date (newest first)
    const sortedEntries = [...journalData.entries].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    // Add each entry to the list
    sortedEntries.forEach(entry => {
        const entryItem = createEntryListItem(entry);
        entriesList.appendChild(entryItem);
    });
    
    sidebar.appendChild(entriesList);
    return sidebar;
}

// Create entry list item
function createEntryListItem(entry) {
    const entryItem = document.createElement('div');
    entryItem.className = 'entry-item';
    entryItem.dataset.entryId = entry.id;
    
    const entryDate = document.createElement('div');
    entryDate.className = 'entry-date';
    entryDate.textContent = formatDate(entry.date);
    
    const entryTitle = document.createElement('div');
    entryTitle.className = 'entry-title';
    entryTitle.textContent = entry.title;
    
    const entryMood = document.createElement('div');
    entryMood.className = 'entry-mood';
    entryMood.innerHTML = getMoodEmoji(entry.mood);
    
    entryItem.appendChild(entryDate);
    entryItem.appendChild(entryTitle);
    entryItem.appendChild(entryMood);
    
    // Add click event to load the entry
    entryItem.addEventListener('click', () => loadJournalEntry(entry.id));
    
    return entryItem;
}

// Create journal content area
function createJournalContentArea() {
    const contentArea = document.createElement('div');
    contentArea.className = 'journal-content';
    contentArea.id = 'journal-content';
    
    // Show placeholder content when no entry is selected
    contentArea.innerHTML = `
        <div class="no-entry-selected">
            <i class="fas fa-book-open"></i>
            <p>Select an entry from the list or create a new one</p>
        </div>
    `;
    
    return contentArea;
}

// Load journal entry
function loadJournalEntry(entryId) {
    const contentArea = document.getElementById('journal-content');
    if (!contentArea) return;
    
    // Find the entry
    const entry = journalData.entries.find(e => e.id === entryId);
    if (!entry) return;
    
    // Mark the entry as active in the list
    const entryItems = document.querySelectorAll('.entry-item');
    entryItems.forEach(item => {
        if (parseInt(item.dataset.entryId) === entryId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Create entry view
    contentArea.innerHTML = '';
    
    // Entry header
    const entryHeader = document.createElement('div');
    entryHeader.className = 'entry-header';
    
    const entryDate = document.createElement('div');
    entryDate.className = 'entry-view-date';
    entryDate.textContent = formatDate(entry.date, 'long');
    
    const entryMood = document.createElement('div');
    entryMood.className = 'entry-view-mood';
    entryMood.innerHTML = `${getMoodEmoji(entry.mood)} ${capitalize(entry.mood)}`;
    
    entryHeader.appendChild(entryDate);
    entryHeader.appendChild(entryMood);
    
    // Entry actions
    const entryActions = document.createElement('div');
    entryActions.className = 'entry-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-small';
    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editBtn.addEventListener('click', () => editEntry(entry.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-small btn-danger';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
    deleteBtn.addEventListener('click', () => deleteEntry(entry.id));
    
    entryActions.appendChild(editBtn);
    entryActions.appendChild(deleteBtn);
    
    // Entry title
    const titleEl = document.createElement('h3');
    titleEl.className = 'entry-view-title';
    titleEl.textContent = entry.title;
    
    // Entry content
    const contentEl = document.createElement('div');
    contentEl.className = 'entry-view-content';
    contentEl.textContent = entry.content;
    
    // Entry tags
    const tagsEl = document.createElement('div');
    tagsEl.className = 'entry-tags';
    
    entry.tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tag';
        tagEl.textContent = tag;
        tagsEl.appendChild(tagEl);
    });
    
    // Add all elements to content area
    contentArea.appendChild(entryHeader);
    contentArea.appendChild(entryActions);
    contentArea.appendChild(titleEl);
    contentArea.appendChild(contentEl);
    contentArea.appendChild(tagsEl);
}

// Create new entry
function createNewEntry() {
    showEntryEditor();
}

// Edit entry
function editEntry(entryId) {
    const entry = journalData.entries.find(e => e.id === entryId);
    if (!entry) return;
    
    showEntryEditor(entry);
}

// Delete entry
function deleteEntry(entryId) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this entry?')) return;
    
    // Remove entry from data
    journalData.entries = journalData.entries.filter(e => e.id !== entryId);
    
    // Rebuild UI to reflect changes
    buildJournalUI();
    
    // Show notification
    showNotification('Entry deleted successfully', 'success');
}

// Show entry editor
function showEntryEditor(entry = null) {
    const contentArea = document.getElementById('journal-content');
    if (!contentArea) return;
    
    // Clear content area
    contentArea.innerHTML = '';
    
    // Create editor form
    const editorForm = document.createElement('form');
    editorForm.className = 'entry-editor';
    editorForm.id = 'entry-editor';
    
    // Title input
    const titleGroup = document.createElement('div');
    titleGroup.className = 'form-group';
    
    const titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'entry-title';
    titleLabel.textContent = 'Title';
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'entry-title';
    titleInput.placeholder = 'Entry title';
    titleInput.value = entry ? entry.title : '';
    titleInput.required = true;
    
    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);
    editorForm.appendChild(titleGroup);
    
    // Mood selection
    const moodGroup = document.createElement('div');
    moodGroup.className = 'form-group';
    
    const moodLabel = document.createElement('label');
    moodLabel.htmlFor = 'entry-mood';
    moodLabel.textContent = 'Mood';
    
    const moodSelect = document.createElement('select');
    moodSelect.id = 'entry-mood';
    
    const moods = ['happy', 'excited', 'calm', 'neutral', 'tired', 'sad', 'anxious', 'stressed', 'angry'];
    
    moods.forEach(mood => {
        const option = document.createElement('option');
        option.value = mood;
        option.textContent = `${getMoodEmoji(mood)} ${capitalize(mood)}`;
        option.selected = entry && entry.mood === mood;
        moodSelect.appendChild(option);
    });
    
    moodGroup.appendChild(moodLabel);
    moodGroup.appendChild(moodSelect);
    editorForm.appendChild(moodGroup);
    
    // Content textarea
    const contentGroup = document.createElement('div');
    contentGroup.className = 'form-group';
    
    const contentLabel = document.createElement('label');
    contentLabel.htmlFor = 'entry-content';
    contentLabel.textContent = 'Content';
    
    const contentInput = document.createElement('textarea');
    contentInput.id = 'entry-content';
    contentInput.placeholder = 'What\'s on your mind today?';
    contentInput.rows = 10;
    contentInput.value = entry ? entry.content : '';
    contentInput.required = true;
    
    contentGroup.appendChild(contentLabel);
    contentGroup.appendChild(contentInput);
    editorForm.appendChild(contentGroup);
    
    // Tags input
    const tagsGroup = document.createElement('div');
    tagsGroup.className = 'form-group';
    
    const tagsLabel = document.createElement('label');
    tagsLabel.htmlFor = 'entry-tags';
    tagsLabel.textContent = 'Tags (comma separated)';
    
    const tagsInput = document.createElement('input');
    tagsInput.type = 'text';
    tagsInput.id = 'entry-tags';
    tagsInput.placeholder = 'e.g., study, exams, friends';
    tagsInput.value = entry ? entry.tags.join(', ') : '';
    
    tagsGroup.appendChild(tagsLabel);
    tagsGroup.appendChild(tagsInput);
    editorForm.appendChild(tagsGroup);
    
    // Action buttons
    const actionGroup = document.createElement('div');
    actionGroup.className = 'form-actions';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        // If editing existing entry, go back to viewing it
        if (entry) {
            loadJournalEntry(entry.id);
        } else {
            // Otherwise show empty state
            contentArea.innerHTML = `
                <div class="no-entry-selected">
                    <i class="fas fa-book-open"></i>
                    <p>Select an entry from the list or create a new one</p>
                </div>
            `;
        }
    });
    
    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.className = 'btn';
    saveBtn.textContent = entry ? 'Update Entry' : 'Save Entry';
    
    actionGroup.appendChild(cancelBtn);
    actionGroup.appendChild(saveBtn);
    editorForm.appendChild(actionGroup);
    
    // Add form submit handler
    editorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveJournalEntry(entry ? entry.id : null);
    });
    
    contentArea.appendChild(editorForm);
    
    // Focus title input
    titleInput.focus();
}

// Save journal entry
function saveJournalEntry(entryId) {
    // Get form values
    const title = document.getElementById('entry-title').value;
    const mood = document.getElementById('entry-mood').value;
    const content = document.getElementById('entry-content').value;
    const tagsStr = document.getElementById('entry-tags').value;
    
    // Parse tags
    const tags = tagsStr.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
    
    if (entryId) {
        // Update existing entry
        const entryIndex = journalData.entries.findIndex(e => e.id === entryId);
        if (entryIndex !== -1) {
            journalData.entries[entryIndex] = {
                ...journalData.entries[entryIndex],
                title,
                mood,
                content,
                tags
            };
        }
    } else {
        // Create new entry
        const newEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            title,
            mood,
            content,
            tags
        };
        
        journalData.entries.push(newEntry);
        entryId = newEntry.id;
    }
    
    // Encrypt and save data
    encryptAndSaveJournalData();
    
    // Rebuild UI to reflect changes
    buildJournalUI();
    
    // Load the saved entry
    loadJournalEntry(entryId);
    
    // Show notification
    showNotification(entryId ? 'Entry updated successfully' : 'Entry created successfully', 'success');
}

// Show journal setup
function showJournalSetup() {
    const journalPage = document.getElementById('journal');
    if (!journalPage) return;
    
    // Clear existing content
    journalPage.innerHTML = '';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Journal Setup';
    journalPage.appendChild(title);
    
    // Create setup form
    const setupForm = document.createElement('form');
    setupForm.className = 'journal-setup-form';
    setupForm.id = 'journal-setup-form';
    
    setupForm.innerHTML = `
        <div class="setup-info">
            <i class="fas fa-lock"></i>
            <h3>Secure Your Journal</h3>
            <p>Your journal entries will be encrypted for privacy. Please set a password to protect your journal.</p>
        </div>
        
        <div class="form-group">
            <label for="journal-password">Password</label>
            <input type="password" id="journal-password" required>
        </div>
        
        <div class="form-group">
            <label for="journal-confirm-password">Confirm Password</label>
            <input type="password" id="journal-confirm-password" required>
        </div>
        
        <div class="form-actions">
            <button type="submit" class="btn">Create Journal</button>
        </div>
    `;
    
    // Add form submit handler
    setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const password = document.getElementById('journal-password').value;
        const confirmPassword = document.getElementById('journal-confirm-password').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Set journal password
        journalData.password = password;
        journalData.isSetup = true;
        
        // Save data
        encryptAndSaveJournalData();
        
        // Build journal UI
        buildJournalUI();
        
        // Show notification
        showNotification('Journal created successfully', 'success');
    });
    
    journalPage.appendChild(setupForm);
}

// Show journal login
function showJournalLogin() {
    const journalPage = document.getElementById('journal');
    if (!journalPage) return;
    
    // Clear existing content
    journalPage.innerHTML = '';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Journal Login';
    journalPage.appendChild(title);
    
    // Create login form
    const loginForm = document.createElement('form');
    loginForm.className = 'journal-login-form';
    loginForm.id = 'journal-login-form';
    
    loginForm.innerHTML = `
        <div class="login-info">
            <i class="fas fa-lock"></i>
            <h3>Enter Your Password</h3>
            <p>Please enter your password to access your journal.</p>
        </div>
        
        <div class="form-group">
            <label for="journal-login-password">Password</label>
            <input type="password" id="journal-login-password" required>
        </div>
        
        <div class="form-actions">
            <button type="submit" class="btn">Unlock Journal</button>
        </div>
    `;
    
    // Add form submit handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const password = document.getElementById('journal-login-password').value;
        
        // In a real app, this would decrypt the journal data
        // For this demo, we just check if the password matches
        if (password === journalData.password) {
            // Build journal UI
            buildJournalUI();
        } else {
            showNotification('Incorrect password', 'error');
        }
    });
    
    journalPage.appendChild(loginForm);
}

// Encrypt and save journal data
function encryptAndSaveJournalData() {
    // In a real app, this would encrypt the data using the password
    // and save it to localStorage or a backend
    console.log('Journal data would be encrypted and saved');
    
    // For this demo, we just save the unencrypted data to localStorage
    try {
        localStorage.setItem('journalData', JSON.stringify(journalData));
    } catch (error) {
        console.error('Error saving journal data:', error);
    }
}

// Search entries
function searchEntries(query) {
    // Clear previous search results
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;
    
    entriesList.innerHTML = '';
    
    // If query is empty, show all entries
    if (!query.trim()) {
        const sortedEntries = [...journalData.entries].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        sortedEntries.forEach(entry => {
            const entryItem = createEntryListItem(entry);
            entriesList.appendChild(entryItem);
        });
        
        return;
    }
    
    // Search entries by title, content, and tags
    const results = journalData.entries.filter(entry => {
        const titleMatch = entry.title.toLowerCase().includes(query.toLowerCase());
        const contentMatch = entry.content.toLowerCase().includes(query.toLowerCase());
        const tagsMatch = entry.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
        return titleMatch || contentMatch || tagsMatch;
    });
    
    // Sort results by date (newest first)
    results.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display search results
    if (results.length === 0) {
        entriesList.innerHTML = `
            <div class="no-results">
                <p>No entries found matching "${query}"</p>
            </div>
        `;
    } else {
        results.forEach(entry => {
            const entryItem = createEntryListItem(entry);
            entriesList.appendChild(entryItem);
        });
    }
}

// Set up journal event listeners
function setupJournalListeners() {
    // Set up search input
    document.addEventListener('input', (e) => {
        if (e.target.id === 'journal-search') {
            searchEntries(e.target.value);
        }
    });
}

// Helper: Format date
function formatDate(dateStr, format = 'short') {
    const date = new Date(dateStr);
    
    if (format === 'short') {
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
        });
    } else if (format === 'long') {
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    return date.toLocaleDateString();
}

// Helper: Get mood emoji
function getMoodEmoji(mood) {
    const moodEmojis = {
        happy: '😊',
        excited: '😃',
        calm: '😌',
        neutral: '😐',
        tired: '😴',
        sad: '😢',
        anxious: '😰',
        stressed: '😫',
        angry: '😠'
    };
    
    return moodEmojis[mood] || '😐';
}

// Helper: Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add journal specific styles
function addJournalStyles() {
    // Check if styles already exist
    if (document.getElementById('journal-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'journal-styles';
    styleEl.textContent = `
        .journal-container {
            display: flex;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            height: calc(100vh - 200px);
            min-height: 500px;
        }
        
        .journal-sidebar {
            width: 300px;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }
        
        .new-entry-btn {
            margin: 1rem;
        }
        
        .search-box {
            padding: 0 1rem 1rem;
        }
        
        .search-box input {
            padding: 0.5rem;
        }
        
        .entries-list {
            flex: 1;
            overflow-y: auto;
            border-top: 1px solid var(--gray-light);
        }
        
        .entry-item {
            padding: 1rem;
            border-bottom: 1px solid var(--gray-light);
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .entry-item:hover {
            background-color: #f9fafb;
        }
        
        .entry-item.active {
            background-color: rgba(79, 70, 229, 0.1);
            border-left: 3px solid var(--primary);
        }
        
        .entry-date {
            color: var(--gray);
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
        }
        
        .entry-title {
            font-weight: 500;
            margin-bottom: 0.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .entry-mood {
            font-size: 1.25rem;
        }
        
        .journal-content {
            flex: 1;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: 2rem;
            overflow-y: auto;
        }
        
        .no-entry-selected {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: var(--gray);
            text-align: center;
        }
        
        .no-entry-selected i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .entry-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
        }
        
        .entry-view-date {
            color: var(--gray);
        }
        
        .entry-view-mood {
            font-size: 1.125rem;
        }
        
        .entry-actions {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .entry-view-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .entry-view-content {
            line-height: 1.6;
            margin-bottom: 1.5rem;
            white-space: pre-line;
        }
        
        .entry-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1.5rem;
        }
        
        .tag {
            background-color: var(--gray-light);
            color: var(--gray);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.875rem;
        }
        
        .entry-editor {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .journal-setup-form, .journal-login-form {
            max-width: 500px;
            margin: 0 auto;
            background-color: white;
            padding: 2rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
        }
        
        .setup-info, .login-info {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .setup-info i, .login-info i {
            font-size: 3rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
            .journal-container {
                flex-direction: column;
                height: auto;
            }
            
            .journal-sidebar {
                width: 100%;
                max-height: 300px;
            }
        }
    `;
    
    document.head.appendChild(styleEl);
} 

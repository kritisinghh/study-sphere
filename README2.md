# StudySphere - Learning & Productivity Platform

StudySphere is a comprehensive learning management platform designed to help students organize their academic and personal life in one place. It features a smart study planner, habit tracker, personal journal, PDF tool, CGPA tracker, resume manager, anonymous feedback polls, and customizable learning paths.

## Features

### 1. Smart Study Planner
- Auto-generates personalized schedules based on subject priorities, deadlines, and available time
- Visual calendar interface with drag-and-drop functionality
- Intelligent time allocation based on task complexity and importance

### 2. Micro-Habit Tracker
- Track daily habits with visual streak representations
- Statistics and insights on habit formation and consistency
- Customizable habits with descriptions and completion criteria

### 3. Encrypted Personal Journal
- Private, secure journaling with mood tracking
- Searchable entries with tagging system
- Mood analysis and trends visualization

### 4. Searchable PDF Highlighter
- Import and organize study materials
- Highlight, annotate, and extract key information
- Full-text search across all documents

### 5. CGPA Tracker
- Semester-wise grade tracking and GPA calculation
- Visual representations of academic progress
- Goal setting and achievement monitoring

### 6. Resume Version Manager
- Create and store multiple resume versions
- Receive AI-based feedback on resume content
- Compare versions and track improvements

### 7. Anonymous Feedback Polls
- Create polls for group projects and collaborations
- Collect anonymous feedback from peers
- Analyze feedback and identify improvement areas

### 8. Learning Path Generator
- Customizable learning paths for different subjects
- Resource recommendations based on learning style
- Track progress and adapt paths as needed

## Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, or Safari)
- Local web server for development (optional)

### Installation
1. Clone or download this repository
2. Open `index.html` in a web browser

For local development with live reload:
1. Install Node.js if not already installed
2. Use a tool like live-server:
   ```
   npm install -g live-server
   cd study-sphere
   live-server
   ```

## Project Structure

```
study-sphere/
├── index.html              # Main HTML file
├── src/
│   ├── css/                # CSS styles
│   │   └── styles.css      # Main stylesheet
│   ├── js/                 # JavaScript files
│   │   ├── app.js          # Main application file
│   │   ├── components/     # Reusable components
│   │   │   └── navigation.js
│   │   ├── pages/          # Page-specific scripts
│   │   │   ├── dashboard.js
│   │   │   ├── planner.js
│   │   │   ├── habits.js
│   │   │   ├── journal.js
│   │   │   ├── pdf.js
│   │   │   ├── cgpa.js
│   │   │   ├── resume.js
│   │   │   ├── feedback.js
│   │   │   └── learning.js
│   │   └── utils/          # Utility functions
│   │       └── helpers.js
│   └── assets/             # Assets like images, icons, etc.
│       └── images/
```

## Usage

1. Open `index.html` in a web browser
2. Navigate between different features using the main navigation
3. Each feature has its own interface with specific functionality

## Customization

You can customize the application by:
- Modifying the CSS in `src/css/styles.css`
- Adding new features in the appropriate page script files
- Extending the utility functions in `src/js/utils/helpers.js`

## Browser Support

The application is designed to work on modern browsers that support ES6+ features. For optimal experience, use the latest version of Chrome, Firefox, Edge, or Safari.


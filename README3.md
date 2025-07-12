# StudySphere

StudySphere is a comprehensive productivity and learning management platform designed for students. It combines task management, habit tracking, journaling, and academic tools in one integrated application.

## Features

- **Smart Study Planner**: Schedule and manage your study tasks with priorities and recurring events
- **Habit Tracker**: Build and maintain positive study habits with streak tracking
- **Personal Journal**: Keep private notes with optional encryption
- **PDF Highlighter**: Upload and annotate study materials
- **CGPA Calculator**: Track your academic progress across semesters
- **Resume Manager**: Build and maintain professional resumes

## Technology Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- File-based JSON storage
- RESTful API architecture

## Setup

### Prerequisites
- Node.js and npm (for backend)
- Any modern web browser (Chrome, Firefox, Edge recommended)

### Installation

1. Clone this repository:
```
git clone [repository-url]
cd studysphere
```

2. Install backend dependencies:
```
cd backend
npm install
```

3. Start the application:
```
# On Windows
start-studysphere.bat

# Manual start
# Start backend
cd backend
node server.js

# Then open index.html in your browser
```

## Using the Application

- The frontend is served as static files that connect to the backend API
- Data is stored in JSON files on the server in the `/backend/data` directory
- All features work offline with local storage fallback if the backend is unavailable
- For the best experience, use the application with the backend running

## Architecture

- The application follows a client-server architecture
- The frontend is built with vanilla JavaScript for maximum compatibility
- The backend provides RESTful APIs for each feature
- File-based storage allows for simple deployment without database setup

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Icons from Font Awesome
- Color schemes inspired by Material Design 

# StudySphere Backend

A simple Node.js backend for the StudySphere productivity and learning management platform.

## Features

- **Study Planner API**: Task management with scheduling and recurring tasks
- **Habit Tracker API**: Track habits with streak calculation
- **Journal API**: Private journaling with optional encryption
- **CGPA Tracker API**: Calculate GPA and CGPA across semesters
- **PDF Highlighter API**: Store PDF highlights and notes
- **Resume Manager API**: Build and manage resume sections

## Technology Stack

- Node.js
- Express.js
- File-based JSON storage
- Multer for file uploads
- Crypto for encryption

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on port 3000 by default. You can change this by setting the PORT environment variable.

## API Endpoints

The backend provides RESTful APIs for each feature:

- `/api/planner`: Study planner endpoints
- `/api/habits`: Habit tracking endpoints
- `/api/journal`: Journal management endpoints
- `/api/cgpa`: CGPA calculation endpoints
- `/api/pdf`: PDF highlighting endpoints
- `/api/resume`: Resume management endpoints

## Data Storage

All data is stored in JSON files within the `data` directory. Each feature has its own file.

## Authentication

This is a simple backend without authentication. In a production environment, you would want to add proper authentication and authorization. 

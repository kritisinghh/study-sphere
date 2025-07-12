# StudySphere API Documentation

This document provides a reference for the StudySphere REST API endpoints.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API does not implement authentication. In a production environment, you would want to add proper authentication and authorization.

## API Endpoints

### Study Planner

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/planner` | Get all tasks |
| GET | `/planner/:id` | Get task by ID |
| GET | `/planner/date/:date` | Get tasks by date |
| POST | `/planner` | Create a new task |
| PUT | `/planner/:id` | Update a task |
| DELETE | `/planner/:id` | Delete a task |

#### Task Object
```json
{
  "id": "1684156271234",
  "title": "Complete Math Assignment",
  "description": "Finish problems 1-10 in Chapter 5",
  "date": "2023-05-20",
  "time": "14:00",
  "priority": "high",
  "completed": false,
  "recurring": false,
  "userId": "user123",
  "createdAt": "2023-05-15T10:24:31.234Z"
}
```

### Habit Tracker

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/habits` | Get all habits |
| GET | `/habits/stats` | Get habits with statistics |
| GET | `/habits/:id` | Get habit by ID |
| POST | `/habits` | Create a new habit |
| POST | `/habits/:id/track` | Track habit completion |
| PUT | `/habits/:id` | Update a habit |
| DELETE | `/habits/:id` | Delete a habit |

#### Habit Object
```json
{
  "id": "1684156789012",
  "name": "Study Programming",
  "description": "Practice coding daily",
  "goal": "daily",
  "tracking": [
    {
      "date": "2023-05-15",
      "completed": true
    },
    {
      "date": "2023-05-16",
      "completed": true
    }
  ],
  "currentStreak": 2,
  "longestStreak": 5,
  "userId": "user123",
  "createdAt": "2023-05-15T10:33:09.012Z"
}
```

### Journal

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/journal` | Get all journal entries |
| GET | `/journal/range` | Get entries by date range |
| GET | `/journal/:id` | Get entry by ID |
| POST | `/journal` | Create a new entry |
| POST | `/journal/encrypted` | Create an encrypted entry |
| POST | `/journal/:id/decrypt` | Decrypt an entry |
| PUT | `/journal/:id` | Update an entry |
| DELETE | `/journal/:id` | Delete an entry |

#### Journal Entry Object
```json
{
  "id": "1684157089345",
  "title": "My Journal Entry",
  "content": "Today I learned about API design...",
  "date": "2023-05-15",
  "userId": "user123",
  "isEncrypted": false,
  "createdAt": "2023-05-15T10:38:09.345Z"
}
```

#### Encrypted Journal Entry Object
```json
{
  "id": "1684157189456",
  "title": "Secret Entry",
  "encryptedContent": {
    "content": "ab12ef34...",
    "iv": "cd56gh78...",
    "salt": "ij90kl12...",
    "authTag": "mn34op56..."
  },
  "date": "2023-05-15",
  "userId": "user123",
  "isEncrypted": true,
  "createdAt": "2023-05-15T10:39:49.456Z"
}
```

### CGPA Tracker

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cgpa` | Get all semesters |
| GET | `/cgpa/:id` | Get semester by ID |
| GET | `/cgpa/user/:userId/calculate` | Calculate CGPA for a user |
| POST | `/cgpa` | Add a new semester |
| PUT | `/cgpa/:id` | Update a semester |
| PUT | `/cgpa/:id/courses` | Update courses in a semester |
| DELETE | `/cgpa/:id` | Delete a semester |

#### Semester Object
```json
{
  "id": "1684157289567",
  "userId": "user123",
  "name": "Spring 2023",
  "courses": [
    {
      "code": "CS101",
      "name": "Introduction to Programming",
      "credits": 4,
      "grade": "A"
    },
    {
      "code": "MATH201",
      "name": "Calculus II",
      "credits": 3,
      "grade": "B+"
    }
  ],
  "gpa": 8.29,
  "totalCredits": 7,
  "createdAt": "2023-05-15T10:41:29.567Z"
}
```

### PDF Highlighter

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pdf` | Get all PDFs |
| GET | `/pdf/:id` | Get PDF by ID with highlights |
| POST | `/pdf/upload` | Upload a PDF |
| POST | `/pdf/:id/highlight` | Add a highlight to a PDF |
| DELETE | `/pdf/:id/highlight/:highlightId` | Delete a highlight |
| DELETE | `/pdf/:id` | Delete a PDF |

#### PDF Object
```json
{
  "id": "1684157389678",
  "userId": "user123",
  "title": "Programming Guide.pdf",
  "fileName": "1684157389678-programming-guide.pdf",
  "filePath": "data/pdfs/user123/1684157389678-programming-guide.pdf",
  "highlights": [
    {
      "id": "1684157489789",
      "text": "Important definition",
      "color": "yellow",
      "page": 5,
      "coordinates": {
        "x": 100,
        "y": 200,
        "width": 300,
        "height": 20
      },
      "note": "Remember this for the exam",
      "createdAt": "2023-05-15T10:44:49.789Z"
    }
  ],
  "createdAt": "2023-05-15T10:43:09.678Z"
}
```

### Resume Manager

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/resume` | Get all resumes |
| GET | `/resume/:id` | Get resume by ID |
| GET | `/resume/user/:userId` | Get all resumes for a user |
| GET | `/resume/:id/generate` | Generate resume for rendering |
| POST | `/resume` | Create a new resume |
| POST | `/resume/:id/section` | Add a section to a resume |
| PUT | `/resume/:id` | Update a resume |
| PUT | `/resume/:id/section/:sectionId` | Update a section in a resume |
| DELETE | `/resume/:id` | Delete a resume |

#### Resume Object
```json
{
  "id": "1684157589890",
  "userId": "user123",
  "title": "My Professional Resume",
  "sections": [
    {
      "id": "1684157689001",
      "title": "Education",
      "content": "Bachelor of Science in Computer Science",
      "type": "education",
      "order": 1,
      "createdAt": "2023-05-15T10:48:09.001Z"
    },
    {
      "id": "1684157789112",
      "title": "Work Experience",
      "content": "Software Developer at Tech Company",
      "type": "experience",
      "order": 2,
      "createdAt": "2023-05-15T10:49:49.112Z"
    }
  ],
  "isActive": true,
  "createdAt": "2023-05-15T10:46:29.890Z"
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK`: Successful request
- `201 Created`: Resource successfully created
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error responses include a JSON object with an error message:

```json
{
  "error": "Description of the error"
}
```

## Data Storage

All data is stored in JSON files within the `data` directory. Each feature has its own file:

- `data/planner.json`
- `data/habits.json`
- `data/journal.json`
- `data/cgpa.json`
- `data/pdf.json`
- `data/resume.json`

PDF files are stored in the `data/pdfs` directory. 

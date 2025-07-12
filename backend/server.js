const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Create data folder if it doesn't exist
const dataPath = path.join(__dirname, 'data');
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Import routes
const plannerRoutes = require('./routes/planner');
const habitsRoutes = require('./routes/habits');
const journalRoutes = require('./routes/journal');
const cgpaRoutes = require('./routes/cgpa');
const pdfRoutes = require('./routes/pdf');
const resumeRoutes = require('./routes/resume');

// Use routes
app.use('/api/planner', plannerRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/cgpa', cgpaRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/resume', resumeRoutes);

// Root route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to StudySphere API' });
});

// Handle production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

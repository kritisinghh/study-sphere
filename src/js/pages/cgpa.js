/**
 * CGPA Tracker Page
 * Track and calculate GPA/CGPA with semester-wise breakdowns
 */

// Sample data - would be loaded from backend or localStorage in a real app
const cgpaData = {
    semesters: [
        {
            id: 1,
            name: 'Fall 2022',
            courses: [
                { id: 101, name: 'Introduction to Computer Science', code: 'CS101', credits: 4, grade: 'A', gradePoint: 4.0 },
                { id: 102, name: 'Calculus I', code: 'MATH101', credits: 3, grade: 'B+', gradePoint: 3.3 },
                { id: 103, name: 'English Composition', code: 'ENG101', credits: 3, grade: 'A-', gradePoint: 3.7 },
                { id: 104, name: 'Introduction to Psychology', code: 'PSY101', credits: 3, grade: 'B', gradePoint: 3.0 }
            ]
        },
        {
            id: 2,
            name: 'Spring 2023',
            courses: [
                { id: 201, name: 'Data Structures', code: 'CS201', credits: 4, grade: 'A-', gradePoint: 3.7 },
                { id: 202, name: 'Calculus II', code: 'MATH102', credits: 3, grade: 'B', gradePoint: 3.0 },
                { id: 203, name: 'Physics I', code: 'PHYS101', credits: 4, grade: 'B+', gradePoint: 3.3 },
                { id: 204, name: 'History of Art', code: 'ART101', credits: 3, grade: 'A', gradePoint: 4.0 }
            ]
        },
        {
            id: 3,
            name: 'Fall 2023',
            courses: [
                { id: 301, name: 'Algorithms', code: 'CS301', credits: 4, grade: 'A', gradePoint: 4.0 },
                { id: 302, name: 'Linear Algebra', code: 'MATH201', credits: 3, grade: 'A-', gradePoint: 3.7 },
                { id: 303, name: 'Physics II', code: 'PHYS102', credits: 4, grade: 'B', gradePoint: 3.0 },
                { id: 304, name: 'Technical Writing', code: 'ENG201', credits: 3, grade: 'A', gradePoint: 4.0 }
            ]
        }
    ],
    gradeScale: {
        'A+': 4.0,
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'F': 0.0
    },
    targetCGPA: 3.5
};

// Initialize CGPA tracker
function initCgpaTracker() {
    console.log('CGPA tracker initialized');
    
    // Build CGPA UI
    buildCgpaUI();
    
    // Set up event listeners
    setupCgpaListeners();
}

// Build the CGPA tracker UI
function buildCgpaUI() {
    const cgpaPage = document.getElementById('cgpa');
    if (!cgpaPage) return;
    
    // Clear existing content
    cgpaPage.innerHTML = '';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'CGPA Tracker';
    cgpaPage.appendChild(title);
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'cgpa-container';
    
    // Create summary card
    const summaryCard = createCgpaSummaryCard();
    container.appendChild(summaryCard);
    
    // Create semesters section
    const semestersSection = createSemestersSection();
    container.appendChild(semestersSection);
    
    // Add container to page
    cgpaPage.appendChild(container);
    
    // Add CSS for CGPA tracker
    addCgpaStyles();
}

// Create CGPA summary card
function createCgpaSummaryCard() {
    const summaryCard = document.createElement('div');
    summaryCard.className = 'card cgpa-summary-card';
    
    // Calculate CGPA
    const { cgpa, totalCredits, totalCourses } = calculateOverallCGPA();
    
    // Create summary content
    summaryCard.innerHTML = `
        <div class="summary-header">
            <h3>CGPA Summary</h3>
            <button class="btn btn-small" id="set-target-btn">
                <i class="fas fa-bullseye"></i> Set Target
            </button>
        </div>
        
        <div class="cgpa-display">
            <div class="current-cgpa">
                <div class="cgpa-value">${cgpa}</div>
                <div class="cgpa-label">Current CGPA</div>
            </div>
            
            <div class="cgpa-target">
                <div class="target-value">${cgpaData.targetCGPA.toFixed(1)}</div>
                <div class="target-label">Target CGPA</div>
            </div>
        </div>
        
        <div class="cgpa-stats">
            <div class="stat">
                <span class="stat-value">${totalCourses}</span>
                <span class="stat-label">Courses</span>
            </div>
            
            <div class="stat">
                <span class="stat-value">${totalCredits}</span>
                <span class="stat-label">Credits</span>
            </div>
            
            <div class="stat">
                <span class="stat-value">${cgpaData.semesters.length}</span>
                <span class="stat-label">Semesters</span>
            </div>
        </div>
        
        <div class="cgpa-progress">
            <div class="progress-label">Progress to Target</div>
            <div class="progress-bar">
                <div class="progress" style="width: ${Math.min(100, (cgpa / cgpaData.targetCGPA) * 100)}%"></div>
            </div>
            <div class="progress-value">${Math.min(100, Math.round((cgpa / cgpaData.targetCGPA) * 100))}%</div>
        </div>
    `;
    
    return summaryCard;
}

// Create semesters section
function createSemestersSection() {
    const semestersSection = document.createElement('div');
    semestersSection.className = 'semesters-section';
    
    // Section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = 'Semester Breakdown';
    
    const addSemesterBtn = document.createElement('button');
    addSemesterBtn.className = 'btn btn-small';
    addSemesterBtn.id = 'add-semester-btn';
    addSemesterBtn.innerHTML = '<i class="fas fa-plus"></i> Add Semester';
    
    sectionHeader.appendChild(sectionTitle);
    sectionHeader.appendChild(addSemesterBtn);
    semestersSection.appendChild(sectionHeader);
    
    // Semesters container
    const semestersContainer = document.createElement('div');
    semestersContainer.className = 'semesters-container';
    
    // Create semester cards
    cgpaData.semesters.forEach(semester => {
        const semesterCard = createSemesterCard(semester);
        semestersContainer.appendChild(semesterCard);
    });
    
    semestersSection.appendChild(semestersContainer);
    return semestersSection;
}

// Create semester card
function createSemesterCard(semester) {
    const card = document.createElement('div');
    card.className = 'card semester-card';
    card.dataset.semesterId = semester.id;
    
    // Calculate semester GPA
    const semesterGPA = calculateSemesterGPA(semester);
    
    // Create card header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'semester-header';
    
    const semesterName = document.createElement('h4');
    semesterName.className = 'semester-name';
    semesterName.textContent = semester.name;
    
    const semesterGpaDisplay = document.createElement('div');
    semesterGpaDisplay.className = 'semester-gpa';
    semesterGpaDisplay.textContent = `GPA: ${semesterGPA}`;
    
    cardHeader.appendChild(semesterName);
    cardHeader.appendChild(semesterGpaDisplay);
    card.appendChild(cardHeader);
    
    // Create courses table
    const coursesTable = document.createElement('table');
    coursesTable.className = 'courses-table';
    
    // Table header
    const tableHead = document.createElement('thead');
    tableHead.innerHTML = `
        <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Grade</th>
        </tr>
    `;
    coursesTable.appendChild(tableHead);
    
    // Table body
    const tableBody = document.createElement('tbody');
    
    semester.courses.forEach(course => {
        const row = document.createElement('tr');
        
        const codeCell = document.createElement('td');
        codeCell.textContent = course.code;
        
        const nameCell = document.createElement('td');
        nameCell.className = 'course-name';
        nameCell.textContent = course.name;
        
        const creditsCell = document.createElement('td');
        creditsCell.textContent = course.credits;
        
        const gradeCell = document.createElement('td');
        gradeCell.className = 'grade';
        gradeCell.textContent = course.grade;
        gradeCell.style.color = getGradeColor(course.grade);
        
        row.appendChild(codeCell);
        row.appendChild(nameCell);
        row.appendChild(creditsCell);
        row.appendChild(gradeCell);
        
        tableBody.appendChild(row);
    });
    
    coursesTable.appendChild(tableBody);
    card.appendChild(coursesTable);
    
    // Card actions
    const cardActions = document.createElement('div');
    cardActions.className = 'card-actions';
    
    const addCourseBtn = document.createElement('button');
    addCourseBtn.className = 'btn btn-small';
    addCourseBtn.dataset.semesterId = semester.id;
    addCourseBtn.innerHTML = '<i class="fas fa-plus"></i> Add Course';
    addCourseBtn.addEventListener('click', () => addCourse(semester.id));
    
    const editSemesterBtn = document.createElement('button');
    editSemesterBtn.className = 'btn btn-small';
    editSemesterBtn.dataset.semesterId = semester.id;
    editSemesterBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editSemesterBtn.addEventListener('click', () => editSemester(semester.id));
    
    cardActions.appendChild(addCourseBtn);
    cardActions.appendChild(editSemesterBtn);
    card.appendChild(cardActions);
    
    return card;
}

// Calculate semester GPA
function calculateSemesterGPA(semester) {
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    semester.courses.forEach(course => {
        totalCredits += course.credits;
        totalGradePoints += course.credits * course.gradePoint;
    });
    
    if (totalCredits === 0) return '0.00';
    
    const gpa = totalGradePoints / totalCredits;
    return gpa.toFixed(2);
}

// Calculate overall CGPA
function calculateOverallCGPA() {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let totalCourses = 0;
    
    cgpaData.semesters.forEach(semester => {
        semester.courses.forEach(course => {
            totalCredits += course.credits;
            totalGradePoints += course.credits * course.gradePoint;
            totalCourses++;
        });
    });
    
    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    
    return { cgpa, totalCredits, totalCourses };
}

// Add new course
function addCourse(semesterId) {
    console.log(`Add course to semester ${semesterId}`);
    showCourseModal(semesterId);
}

// Edit semester
function editSemester(semesterId) {
    console.log(`Edit semester ${semesterId}`);
    showSemesterModal(semesterId);
}

// Show course modal
function showCourseModal(semesterId, courseId = null) {
    // In a real app, this would show a modal to add/edit a course
    // For this demo, we'll simulate adding a new course
    
    if (!courseId) {
        // Adding new course
        const semester = cgpaData.semesters.find(s => s.id === semesterId);
        if (!semester) return;
        
        // Create a new course
        const newCourse = {
            id: Date.now(),
            name: 'New Course',
            code: 'COURSE101',
            credits: 3,
            grade: 'B',
            gradePoint: 3.0
        };
        
        // Add to semester
        semester.courses.push(newCourse);
        
        // Rebuild UI
        buildCgpaUI();
        
        // Show notification
        showNotification('Course added successfully', 'success');
    }
}

// Show semester modal
function showSemesterModal(semesterId = null) {
    // In a real app, this would show a modal to add/edit a semester
    // For this demo, we'll simulate adding a new semester
    
    if (!semesterId) {
        // Adding new semester
        const newSemester = {
            id: Date.now(),
            name: `Semester ${cgpaData.semesters.length + 1}`,
            courses: []
        };
        
        // Add to data
        cgpaData.semesters.push(newSemester);
        
        // Rebuild UI
        buildCgpaUI();
        
        // Show notification
        showNotification('Semester added successfully', 'success');
    }
}

// Set up event listeners
function setupCgpaListeners() {
    // Add semester button
    document.addEventListener('click', (e) => {
        if (e.target.id === 'add-semester-btn' || e.target.closest('#add-semester-btn')) {
            showSemesterModal();
        }
    });
    
    // Set target button
    document.addEventListener('click', (e) => {
        if (e.target.id === 'set-target-btn' || e.target.closest('#set-target-btn')) {
            showTargetModal();
        }
    });
}

// Show target modal
function showTargetModal() {
    // In a real app, this would show a modal to set the target CGPA
    // For this demo, we'll use a simple prompt
    const target = prompt('Enter your target CGPA:', cgpaData.targetCGPA);
    
    if (target !== null) {
        const newTarget = parseFloat(target);
        
        if (!isNaN(newTarget) && newTarget > 0 && newTarget <= 4.0) {
            cgpaData.targetCGPA = newTarget;
            buildCgpaUI();
            showNotification('Target CGPA updated', 'success');
        } else {
            showNotification('Please enter a valid CGPA between 0 and 4.0', 'error');
        }
    }
}

// Helper: Get grade color
function getGradeColor(grade) {
    const firstChar = grade.charAt(0);
    
    switch (firstChar) {
        case 'A':
            return '#10b981'; // Green
        case 'B':
            return '#3b82f6'; // Blue
        case 'C':
            return '#f59e0b'; // Orange
        case 'D':
            return '#ef4444'; // Red
        case 'F':
            return '#ef4444'; // Red
        default:
            return 'inherit';
    }
}

// Add CGPA tracker specific styles
function addCgpaStyles() {
    // Check if styles already exist
    if (document.getElementById('cgpa-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'cgpa-styles';
    styleEl.textContent = `
        .cgpa-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .cgpa-summary-card {
            margin-bottom: 2rem;
        }
        
        .summary-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .summary-header h3 {
            margin: 0;
        }
        
        .cgpa-display {
            display: flex;
            gap: 2rem;
            margin-bottom: 1.5rem;
        }
        
        .current-cgpa, .cgpa-target {
            text-align: center;
        }
        
        .cgpa-value, .target-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .target-value {
            color: var(--info);
        }
        
        .cgpa-label, .target-label {
            color: var(--gray);
            font-size: 0.875rem;
        }
        
        .cgpa-stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 1.5rem;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-value {
            display: block;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .stat-label {
            color: var(--gray);
            font-size: 0.875rem;
        }
        
        .cgpa-progress {
            margin-top: 1rem;
        }
        
        .progress-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            color: var(--gray);
            font-size: 0.875rem;
        }
        
        .progress-bar {
            height: 10px;
            background-color: var(--gray-light);
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        
        .progress {
            height: 100%;
            background-color: var(--primary);
        }
        
        .progress-value {
            text-align: right;
            font-size: 0.875rem;
            color: var(--gray);
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .semesters-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 1.5rem;
        }
        
        .semester-card {
            height: 100%;
        }
        
        .semester-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            border-bottom: 1px solid var(--gray-light);
            padding-bottom: 0.5rem;
        }
        
        .semester-name {
            margin: 0;
        }
        
        .semester-gpa {
            font-weight: 600;
            color: var(--primary);
        }
        
        .courses-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }
        
        .courses-table th {
            text-align: left;
            padding: 0.5rem;
            border-bottom: 1px solid var(--gray-light);
            font-weight: 500;
        }
        
        .courses-table td {
            padding: 0.5rem;
            border-bottom: 1px solid var(--gray-light);
        }
        
        .course-name {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .grade {
            font-weight: 600;
        }
        
        .card-actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        @media (max-width: 768px) {
            .cgpa-display {
                flex-direction: column;
                gap: 1rem;
            }
            
            .semesters-container {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(styleEl);
} 

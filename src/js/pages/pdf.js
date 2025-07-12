/**
 * PDF Tools Page
 * Searchable PDF highlighter for study materials
 */

// Initialize PDF tools
function initPdfTools() {
    console.log('PDF Tools initialized');
    
    // Build PDF tools UI
    buildPdfToolsUI();
    
    // Set up event listeners
    setupPdfListeners();
}

// Build the PDF tools UI
function buildPdfToolsUI() {
    const pdfPage = document.getElementById('pdf');
    if (!pdfPage) return;
    
    // Clear existing content
    pdfPage.innerHTML = '';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'PDF Highlighter';
    pdfPage.appendChild(title);
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'pdf-container';
    
    // Create PDF tools interface
    const pdfInterface = createPdfInterface();
    container.appendChild(pdfInterface);
    
    // Add container to page
    pdfPage.appendChild(container);
    
    // Add CSS for PDF tools
    addPdfStyles();
    
    // Show initial empty state
    showEmptyState();
}

// Create PDF interface
function createPdfInterface() {
    const interface = document.createElement('div');
    interface.className = 'pdf-interface';
    
    // Create sidebar (file list & highlights)
    const sidebar = document.createElement('div');
    sidebar.className = 'pdf-sidebar';
    
    // Create upload section
    const uploadSection = document.createElement('div');
    uploadSection.className = 'upload-section';
    
    const uploadButton = document.createElement('label');
    uploadButton.className = 'btn upload-btn';
    uploadButton.innerHTML = '<i class="fas fa-file-upload"></i> Upload PDF';
    
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.accept = 'application/pdf';
    uploadInput.id = 'pdf-upload';
    uploadInput.style.display = 'none';
    uploadInput.addEventListener('change', handleFileUpload);
    
    uploadButton.appendChild(uploadInput);
    uploadSection.appendChild(uploadButton);
    sidebar.appendChild(uploadSection);
    
    // Create tabs for files and highlights
    const tabs = document.createElement('div');
    tabs.className = 'sidebar-tabs';
    
    const filesTab = document.createElement('button');
    filesTab.className = 'tab-btn active';
    filesTab.textContent = 'Files';
    filesTab.dataset.tab = 'files';
    
    const highlightsTab = document.createElement('button');
    highlightsTab.className = 'tab-btn';
    highlightsTab.textContent = 'Highlights';
    highlightsTab.dataset.tab = 'highlights';
    
    tabs.appendChild(filesTab);
    tabs.appendChild(highlightsTab);
    sidebar.appendChild(tabs);
    
    // Create tab content
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    
    // Files list
    const filesList = document.createElement('div');
    filesList.className = 'files-list tab-pane active';
    filesList.id = 'files-list';
    filesList.innerHTML = '<div class="no-files">No PDFs uploaded yet</div>';
    
    // Highlights list
    const highlightsList = document.createElement('div');
    highlightsList.className = 'highlights-list tab-pane';
    highlightsList.id = 'highlights-list';
    highlightsList.innerHTML = '<div class="no-highlights">No highlights yet</div>';
    
    tabContent.appendChild(filesList);
    tabContent.appendChild(highlightsList);
    sidebar.appendChild(tabContent);
    
    // Create viewer
    const viewer = document.createElement('div');
    viewer.className = 'pdf-viewer';
    viewer.id = 'pdf-viewer';
    
    interface.appendChild(sidebar);
    interface.appendChild(viewer);
    
    return interface;
}

// Show empty state
function showEmptyState() {
    const viewer = document.getElementById('pdf-viewer');
    if (!viewer) return;
    
    viewer.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-file-pdf"></i>
            <h3>No PDF Selected</h3>
            <p>Upload a PDF file to get started</p>
        </div>
    `;
}

// Handle file upload
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
        showNotification('Please upload a valid PDF file', 'error');
        return;
    }
    
    // In a real app, this would store the file or upload it to a server
    // For this demo, we'll just simulate loading the PDF
    
    // Clear input value so the same file can be uploaded again
    e.target.value = '';
    
    // Add file to list
    addFileToList(file);
    
    // Show loading state
    showLoadingState();
    
    // Simulate loading delay
    setTimeout(() => {
        loadPdf(file);
    }, 1000);
}

// Add file to list
function addFileToList(file) {
    const filesList = document.getElementById('files-list');
    if (!filesList) return;
    
    // Remove "no files" message if it exists
    const noFiles = filesList.querySelector('.no-files');
    if (noFiles) {
        filesList.removeChild(noFiles);
    }
    
    // Create file item
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.filename = file.name;
    
    const fileIcon = document.createElement('i');
    fileIcon.className = 'fas fa-file-pdf';
    
    const fileName = document.createElement('span');
    fileName.className = 'file-name';
    fileName.textContent = file.name;
    
    fileItem.appendChild(fileIcon);
    fileItem.appendChild(fileName);
    
    // Add click handler to load the file
    fileItem.addEventListener('click', () => {
        // Mark this file as active
        document.querySelectorAll('.file-item').forEach(item => {
            item.classList.remove('active');
        });
        fileItem.classList.add('active');
        
        // Show loading state
        showLoadingState();
        
        // Simulate loading delay
        setTimeout(() => {
            loadPdf(file);
        }, 500);
    });
    
    // Add to files list
    filesList.appendChild(fileItem);
    
    // Mark as active
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
    });
    fileItem.classList.add('active');
}

// Show loading state
function showLoadingState() {
    const viewer = document.getElementById('pdf-viewer');
    if (!viewer) return;
    
    viewer.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading PDF...</p>
        </div>
    `;
}

// Load PDF file
function loadPdf(file) {
    const viewer = document.getElementById('pdf-viewer');
    if (!viewer) return;
    
    // In a real app, this would use PDF.js to render the PDF
    // For this demo, we'll just simulate a rendered PDF
    
    // Create viewer content
    viewer.innerHTML = `
        <div class="pdf-toolbar">
            <div class="page-navigation">
                <button class="btn btn-small" id="prev-page" disabled>
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span class="page-display">Page <span id="current-page">1</span> of <span id="total-pages">3</span></span>
                <button class="btn btn-small" id="next-page">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="toolbar-actions">
                <div class="zoom-controls">
                    <button class="btn btn-small" id="zoom-out">
                        <i class="fas fa-search-minus"></i>
                    </button>
                    <span id="zoom-level">100%</span>
                    <button class="btn btn-small" id="zoom-in">
                        <i class="fas fa-search-plus"></i>
                    </button>
                </div>
                <button class="btn btn-small" id="highlight-btn">
                    <i class="fas fa-highlighter"></i> Highlight
                </button>
            </div>
        </div>
        <div class="pdf-content" id="pdf-content">
            <!-- Simulated PDF page -->
            <div class="pdf-page">
                <h2>Sample PDF Content</h2>
                <p>This is a sample paragraph that simulates text in a PDF document. You can select this text and press the highlight button to create a highlight.</p>
                <p>StudySphere is a comprehensive learning management platform designed to help students organize their academic and personal life in one place.</p>
                <p>The application features a smart study planner that auto-generates personalized schedules based on subject priorities, deadlines, and available time.</p>
                <p>Additional features include a micro-habit tracker with streak visualization and an encrypted personal journal with mood tracking.</p>
                <p>The searchable PDF highlighter tool allows students to import study materials, add highlights, and search through their annotations easily.</p>
            </div>
        </div>
    `;
    
    // Set up event listeners for PDF viewer
    setupPdfViewerListeners();
    
    // Show notification
    showNotification(`Loaded "${file.name}"`, 'success');
}

// Set up PDF viewer listeners
function setupPdfViewerListeners() {
    // Page navigation
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');
    
    let currentPage = 1;
    const totalPages = 3; // Simulated total pages
    
    if (prevPageBtn && nextPageBtn && currentPageEl && totalPagesEl) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                currentPageEl.textContent = currentPage;
                prevPageBtn.disabled = currentPage === 1;
                nextPageBtn.disabled = false;
                // In a real app, this would load the previous page
            }
        });
        
        nextPageBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                currentPageEl.textContent = currentPage;
                prevPageBtn.disabled = false;
                nextPageBtn.disabled = currentPage === totalPages;
                // In a real app, this would load the next page
            }
        });
    }
    
    // Zoom controls
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomLevelEl = document.getElementById('zoom-level');
    
    let zoomLevel = 100;
    
    if (zoomInBtn && zoomOutBtn && zoomLevelEl) {
        zoomInBtn.addEventListener('click', () => {
            if (zoomLevel < 200) {
                zoomLevel += 25;
                zoomLevelEl.textContent = `${zoomLevel}%`;
                document.getElementById('pdf-content').style.fontSize = `${zoomLevel}%`;
            }
        });
        
        zoomOutBtn.addEventListener('click', () => {
            if (zoomLevel > 50) {
                zoomLevel -= 25;
                zoomLevelEl.textContent = `${zoomLevel}%`;
                document.getElementById('pdf-content').style.fontSize = `${zoomLevel}%`;
            }
        });
    }
    
    // Highlight button
    const highlightBtn = document.getElementById('highlight-btn');
    
    if (highlightBtn) {
        highlightBtn.addEventListener('click', () => {
            createHighlight();
        });
    }
}

// Create highlight from selected text
function createHighlight() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
        showNotification('Please select text to highlight', 'info');
        return;
    }
    
    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    
    if (!selectedText.trim()) {
        showNotification('Please select text to highlight', 'info');
        return;
    }
    
    // Create span element for highlight
    const highlight = document.createElement('span');
    highlight.className = 'text-highlight';
    highlight.dataset.id = Date.now(); // Unique ID
    highlight.dataset.text = selectedText;
    
    // Surround selected text with highlight span
    range.surroundContents(highlight);
    
    // Clear selection
    selection.removeAllRanges();
    
    // Add to highlights list
    addHighlightToList(selectedText, highlight.dataset.id);
    
    // Show notification
    showNotification('Highlight created', 'success');
}

// Add highlight to list
function addHighlightToList(text, id) {
    const highlightsList = document.getElementById('highlights-list');
    if (!highlightsList) return;
    
    // Remove "no highlights" message if it exists
    const noHighlights = highlightsList.querySelector('.no-highlights');
    if (noHighlights) {
        highlightsList.removeChild(noHighlights);
    }
    
    // Create highlight item
    const highlightItem = document.createElement('div');
    highlightItem.className = 'highlight-item';
    highlightItem.dataset.id = id;
    
    const highlightIcon = document.createElement('i');
    highlightIcon.className = 'fas fa-highlighter';
    
    const highlightText = document.createElement('span');
    highlightText.className = 'highlight-text';
    highlightText.textContent = text.length > 50 ? text.substring(0, 50) + '...' : text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-highlight';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteHighlight(id);
    });
    
    highlightItem.appendChild(highlightIcon);
    highlightItem.appendChild(highlightText);
    highlightItem.appendChild(deleteBtn);
    
    // Add click handler to scroll to highlight
    highlightItem.addEventListener('click', () => {
        scrollToHighlight(id);
    });
    
    // Add to highlights list
    highlightsList.appendChild(highlightItem);
}

// Scroll to highlight
function scrollToHighlight(id) {
    const highlight = document.querySelector(`.text-highlight[data-id="${id}"]`);
    if (highlight) {
        highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Flash effect
        highlight.classList.add('flash');
        setTimeout(() => {
            highlight.classList.remove('flash');
        }, 2000);
    }
}

// Delete highlight
function deleteHighlight(id) {
    // Remove from UI
    const highlight = document.querySelector(`.text-highlight[data-id="${id}"]`);
    if (highlight) {
        // Get parent node
        const parent = highlight.parentNode;
        // Extract text content
        const textContent = highlight.textContent;
        // Create text node
        const textNode = document.createTextNode(textContent);
        // Replace highlight with text node
        parent.replaceChild(textNode, highlight);
    }
    
    // Remove from highlights list
    const highlightItem = document.querySelector(`.highlight-item[data-id="${id}"]`);
    if (highlightItem) {
        highlightItem.parentNode.removeChild(highlightItem);
    }
    
    // Check if highlights list is empty
    const highlightsList = document.getElementById('highlights-list');
    if (highlightsList && !highlightsList.querySelector('.highlight-item')) {
        highlightsList.innerHTML = '<div class="no-highlights">No highlights yet</div>';
    }
    
    // Show notification
    showNotification('Highlight deleted', 'info');
}

// Set up PDF tools event listeners
function setupPdfListeners() {
    // Tab switching
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Show corresponding tab pane
            const tabName = e.target.dataset.tab;
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            const activePane = document.querySelector(`.tab-pane#${tabName}-list`);
            if (activePane) {
                activePane.classList.add('active');
            }
        }
    });
}

// Add PDF tools specific styles
function addPdfStyles() {
    // Check if styles already exist
    if (document.getElementById('pdf-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'pdf-styles';
    styleEl.textContent = `
        .pdf-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .pdf-interface {
            display: flex;
            gap: 1.5rem;
            height: calc(100vh - 200px);
            min-height: 500px;
        }
        
        .pdf-sidebar {
            width: 300px;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }
        
        .upload-section {
            padding: 1rem;
            border-bottom: 1px solid var(--gray-light);
        }
        
        .upload-btn {
            width: 100%;
            text-align: center;
        }
        
        .sidebar-tabs {
            display: flex;
            border-bottom: 1px solid var(--gray-light);
        }
        
        .tab-btn {
            flex: 1;
            padding: 0.75rem;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--gray);
            font-weight: 500;
            transition: var(--transition);
        }
        
        .tab-btn:hover {
            color: var(--dark);
        }
        
        .tab-btn.active {
            color: var(--primary);
            border-bottom: 2px solid var(--primary);
        }
        
        .tab-content {
            flex: 1;
            overflow-y: auto;
        }
        
        .tab-pane {
            display: none;
            height: 100%;
        }
        
        .tab-pane.active {
            display: block;
        }
        
        .no-files, .no-highlights {
            padding: 2rem 1rem;
            text-align: center;
            color: var(--gray);
        }
        
        .file-item {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--gray-light);
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .file-item:hover {
            background-color: #f9fafb;
        }
        
        .file-item.active {
            background-color: rgba(79, 70, 229, 0.1);
            border-left: 3px solid var(--primary);
        }
        
        .file-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .highlight-item {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--gray-light);
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            position: relative;
        }
        
        .highlight-item:hover {
            background-color: #f9fafb;
        }
        
        .highlight-text {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .delete-highlight {
            background: none;
            border: none;
            color: var(--gray);
            cursor: pointer;
            padding: 0.25rem;
            transition: var(--transition);
        }
        
        .delete-highlight:hover {
            color: var(--danger);
        }
        
        .pdf-viewer {
            flex: 1;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .empty-state {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: var(--gray);
            text-align: center;
            padding: 2rem;
        }
        
        .empty-state i {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.3;
        }
        
        .loading-state {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--gray-light);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .pdf-toolbar {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--gray-light);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .page-navigation {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .toolbar-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .zoom-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .pdf-content {
            flex: 1;
            overflow-y: auto;
            padding: 2rem;
            transition: font-size 0.2s;
        }
        
        .pdf-page {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            border: 1px solid var(--gray-light);
            box-shadow: var(--shadow);
        }
        
        .pdf-page h2 {
            margin-top: 0;
        }
        
        .text-highlight {
            background-color: rgba(255, 235, 59, 0.5);
            padding: 2px 0;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .text-highlight:hover {
            background-color: rgba(255, 235, 59, 0.7);
        }
        
        .text-highlight.flash {
            animation: highlight-flash 2s;
        }
        
        @keyframes highlight-flash {
            0% { background-color: rgba(255, 235, 59, 0.5); }
            50% { background-color: rgba(255, 152, 0, 0.7); }
            100% { background-color: rgba(255, 235, 59, 0.5); }
        }
        
        @media (max-width: 768px) {
            .pdf-interface {
                flex-direction: column;
                height: auto;
            }
            
            .pdf-sidebar {
                width: 100%;
                max-height: 300px;
            }
            
            .pdf-viewer {
                height: 600px;
            }
        }
    `;
    
    document.head.appendChild(styleEl);
} 

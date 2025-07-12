/**
 * Navigation Component
 * Handles navigation functionality throughout the application
 */

// Store active page state
let activePage = 'dashboard';

// Initialize navigation listeners
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Set up event listeners for each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Handle back/forward browser navigation
    window.addEventListener('popstate', handleHistoryNavigation);
    
    // Update the URL hash on initial load if needed
    if (!window.location.hash || window.location.hash === '#') {
        updateUrlHash('dashboard');
    } else {
        // Navigate to the page from URL hash if present
        const pageId = window.location.hash.substring(1);
        navigateToPage(pageId);
    }
}

// Handle click on navigation links
function handleNavigation(e) {
    e.preventDefault();
    
    const pageId = this.getAttribute('data-page');
    navigateToPage(pageId);
    updateUrlHash(pageId);
}

// Handle back/forward browser navigation
function handleHistoryNavigation(e) {
    if (window.location.hash) {
        const pageId = window.location.hash.substring(1);
        navigateToPage(pageId, false); // Don't update history again
    }
}

// Navigate to specified page
function navigateToPage(pageId, updateHistory = true) {
    // If pageId is invalid, default to dashboard
    if (!document.getElementById(pageId)) {
        pageId = 'dashboard';
    }
    
    // Don't do anything if we're already on this page
    if (pageId === activePage) return;
    
    // Update active state in navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update active page tracking
    activePage = pageId;
    
    // Update browser history if needed
    if (updateHistory) {
        updateUrlHash(pageId);
    }
    
    // Trigger page initialization
    triggerPageInit(pageId);
}

// Update URL hash for browser history
function updateUrlHash(pageId) {
    history.pushState(null, null, `#${pageId}`);
}

// Trigger page-specific initialization
function triggerPageInit(pageId) {
    // This function will call the appropriate initialization function for each page
    switch(pageId) {
        case 'dashboard':
            if (typeof initDashboard === 'function') initDashboard();
            break;
        case 'planner':
            if (typeof initPlanner === 'function') initPlanner();
            break;
        case 'habits':
            if (typeof initHabits === 'function') initHabits();
            break;
        case 'journal':
            if (typeof initJournal === 'function') initJournal();
            break;
        case 'pdf':
            if (typeof initPdfTools === 'function') initPdfTools();
            break;
        case 'cgpa':
            if (typeof initCgpaTracker === 'function') initCgpaTracker();
            break;
        case 'resume':
            if (typeof initResumeManager === 'function') initResumeManager();
            break;
        case 'feedback':
            if (typeof initFeedback === 'function') initFeedback();
            break;
        case 'learning':
            if (typeof initLearningPath === 'function') initLearningPath();
            break;
    }
}

// Create breadcrumb navigation
function createBreadcrumbs(path) {
    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.className = 'breadcrumbs';
    
    // Always include Home
    const homeLink = document.createElement('a');
    homeLink.href = '#dashboard';
    homeLink.textContent = 'Home';
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToPage('dashboard');
    });
    
    breadcrumbContainer.appendChild(homeLink);
    
    // Add separator
    const separator = document.createElement('span');
    separator.className = 'breadcrumb-separator';
    separator.innerHTML = '&rsaquo;';
    breadcrumbContainer.appendChild(separator);
    
    // Add current page
    const currentPage = document.createElement('span');
    currentPage.className = 'current-page';
    currentPage.textContent = path;
    breadcrumbContainer.appendChild(currentPage);
    
    return breadcrumbContainer;
}

// Export functions
// Note: In a module-based application, you would use export statements 

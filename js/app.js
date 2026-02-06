/**
 * MAIN CONTROLLER
 * Connects all modules and handles global logic.
 */

// 1. Import Modules
import { saveUserData, getUserData, clearData, isUserLoggedIn } from './modules/storage.js';
import { renderUserData, renderFilePreview, setTheme } from './modules/renderer.js';
import { initDashboardTimer } from './modules/countdown.js';
import { isDayUnlocked } from './modules/unlocker.js';

// --- CONFIGURATION ---
// 🔴 TEST MODE: Set to TRUE to force all days to open (for debugging)
// 🔴 Set to FALSE for the real Valentine's experience
const TEST_MODE = false; 

// 2. Global Event Listener
document.addEventListener('DOMContentLoaded', () => {
    
    // Identify current page based on URL
    const path = window.location.pathname;
    const page = path.split("/").pop(); // e.g., "index.html" or "dashboard.html"

    // --- GLOBAL SETUP ---
    setTheme('passion-red');

    // --- ROUTING LOGIC ---

    // A. LOGIN PAGE (index.html or root)
    if (page === 'index.html' || page === '') {
        handleLoginPage();
    } 
    
    // B. DASHBOARD (dashboard.html)
    else if (page === 'dashboard.html') {
        if (!checkAuth()) return; // Stop if not logged in
        handleDashboardPage();
    } 
    
    // C. ALL OTHER PAGES (The Day Pages)
    else {
        if (!checkAuth()) return; // Stop if not logged in
        
        // Render User Info automatically
        const user = getUserData();
        renderUserData(user);
    }
});

/**
 * HELPER: Checks if user is logged in. 
 * Redirects to index if false.
 */
function checkAuth() {
    if (!isUserLoggedIn()) {
        window.location.href = '../index.html'; // Go back to login
        return false;
    }
    return true;
}

/**
 * LOGIC FOR LOGIN PAGE
 */
function handleLoginPage() {
    clearData(); // Clear old data when on login screen

    const form = document.getElementById('login-form');
    const photoInput = document.getElementById('photo-upload');
    const fileText = document.getElementById('file-text');

    // 1. File Upload Preview (Updates the "Choose File" text)
    if (photoInput && fileText) {
        photoInput.addEventListener('change', () => {
            renderFilePreview(photoInput, fileText);
        });
    }

    // 2. Form Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // STOP the form from refreshing the page
            
            const partnerName = document.getElementById('partner-name').value;
            
            // Handle Photo Processing
            if (photoInput.files && photoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Save Name + Photo
                    saveUserData(partnerName, event.target.result);
                    window.location.href = '../Pages/dashboard.html';
                };
                reader.readAsDataURL(photoInput.files[0]);
            } else {
                // Save Name Only
                saveUserData(partnerName, null);
                window.location.href = '../Pages/dashboard.html';
            }
        });
    }
}

/**
 * LOGIC FOR DASHBOARD
 */
function handleDashboardPage() {
    // 1. Render User Info (Name & Photo)
    renderUserData(getUserData());

    // 2. Start Countdown (Optional: requires an element with id="timer")
    if(document.getElementById('timer')) {
        initDashboardTimer('timer');
    }

    // 3. AUTOMATIC CARD LOCKING SYSTEM
    // This looks at every card and decides if it should be Open or Locked
    const cards = document.querySelectorAll('.day-card');

    cards.forEach(card => {
        const dateStr = card.getAttribute('data-date'); // e.g. "2026-02-07"
        const statusBadge = card.querySelector('.status-badge');
        
        // Check if day is unlocked (using module logic OR Test Mode)
        const isOpen = TEST_MODE || isDayUnlocked(dateStr);

        if (isOpen) {
            // UNLOCKED STATE
            card.classList.remove('locked');
            card.classList.add('unlocked');
            
            if(statusBadge) {
                statusBadge.innerText = "Open";
                statusBadge.style.background = "#4cc9f0"; // Blue
                statusBadge.style.color = "white";
            }
        } else {
            // LOCKED STATE
            card.classList.add('locked');
            if(statusBadge) statusBadge.innerText = "Locked";
            
            // Intercept Clicks
            card.addEventListener('click', (e) => {
                e.preventDefault(); // Stop link
                alert("It's not that day yet! Patience is key... 🤫");
            });
        }
    });
}
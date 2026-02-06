/**
 * UNLOCKER MODULE
 * Handles the logic for locking/unlocking pages based on the real-world date.
 */

// --- CONFIGURATION ---
// Set this to TRUE to unlock everything for testing.
// Set to FALSE for the real Valentine's week.
const DEV_MODE = false; 

/**
 * Checks if a specific date is reachable.
 * @param {string} targetDateStr - Format 'YYYY-MM-DD' (e.g., '2026-02-14')
 * @returns {boolean} True if the page should be open.
 */
export function isDayUnlocked(targetDateStr) {
    if (DEV_MODE) return true;

    const today = new Date();
    const target = new Date(targetDateStr);

    // Reset time to midnight (00:00:00) so we compare DATES, not timestamps
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    // If Today is Equal to or After the Target Date, it's unlocked
    return today.getTime() >= target.getTime();
}

/**
 * Enforces security on a specific page.
 * Call this at the top of rose_day.html, propose_day.html, etc.
 * @param {string} targetDateStr - The date this page belongs to.
 */
export function enforceSecurity(targetDateStr) {
    if (!isDayUnlocked(targetDateStr)) {
        console.warn(`Access Denied: It is not ${targetDateStr} yet.`);
        // Redirect to the locked screen
        // We use '../' because we assume this is called from inside the /pages/ folder
        window.location.href = 'coming_soon.html';
    }
}
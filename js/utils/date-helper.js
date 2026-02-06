/**
 * DATE HELPER UTILITIES
 * Small functions to make handling dates easier across the app.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Returns a friendly string like "Saturday, Feb 14"
 * @param {string} dateString - YYYY-MM-DD
 */
export function getFriendlyDate(dateString) {
    const date = new Date(dateString);
    const dayName = DAYS[date.getDay()];
    const monthName = MONTHS[date.getMonth()];
    const dayNum = date.getDate();
    
    return `${dayName}, ${monthName} ${dayNum}`;
}

/**
 * Returns the difference in days between today and a target date.
 * Useful for showing "2 Days Left" on the Dashboard.
 * @param {string} targetDateString 
 * @returns {number} Positive number = days left, Negative = days passed
 */
export function getDaysRemaining(targetDateString) {
    const today = new Date();
    const target = new Date(targetDateString);
    
    // Normalize to midnight to compare just the days
    today.setHours(0,0,0,0);
    target.setHours(0,0,0,0);
    
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays;
}

/**
 * Returns true if the given date string is TODAY.
 * @param {string} dateString 
 */
export function isToday(dateString) {
    const today = new Date();
    const target = new Date(dateString);
    
    return today.getDate() === target.getDate() &&
           today.getMonth() === target.getMonth() &&
           today.getFullYear() === target.getFullYear();
}
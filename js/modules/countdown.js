/**
 * COUNTDOWN MODULE
 * Handles all timer logic for the application.
 */

// 1. Helper: Format numbers (e.g., turns "9" into "09")
function pad(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Starts a countdown to a specific date.
 * @param {string} dateString - The target date (e.g., "2026-02-14T00:00:00")
 * @param {string} elementId - The ID of the HTML element to update
 * @param {function} onComplete - (Optional) Callback when timer hits 0
 */
export function startCountdown(dateString, elementId, onComplete) {
    const display = document.getElementById(elementId);
    if (!display) return; // Exit if element doesn't exist

    const targetDate = new Date(dateString).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // If timer expired
        if (distance < 0) {
            clearInterval(interval);
            display.innerText = "00:00:00";
            if (onComplete) onComplete();
            return;
        }

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format Output: "2d 10h 45m 20s" or just "10:45:20"
        if (days > 0) {
            display.innerText = `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        } else {
            display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }

    }, 1000);
}

/**
 * Automatically finds the NEXT event in Valentine's week and counts down to it.
 * Used for the Dashboard header.
 */
export function initDashboardTimer(timerElementId) {
    const now = new Date();
    const currentYear = now.getFullYear();

    // The Schedule
    const events = [
        { name: "Rose Day", date: new Date(`${currentYear}-02-07T00:00:00`) },
        { name: "Propose Day", date: new Date(`${currentYear}-02-08T00:00:00`) },
        { name: "Chocolate Day", date: new Date(`${currentYear}-02-09T00:00:00`) },
        { name: "Teddy Day", date: new Date(`${currentYear}-02-10T00:00:00`) },
        { name: "Promise Day", date: new Date(`${currentYear}-02-11T00:00:00`) },
        { name: "Hug Day", date: new Date(`${currentYear}-02-12T00:00:00`) },
        { name: "Kiss Day", date: new Date(`${currentYear}-02-13T00:00:00`) },
        { name: "Valentine's Day", date: new Date(`${currentYear}-02-14T00:00:00`) }
    ];

    // Find the first event that hasn't happened yet
    const nextEvent = events.find(event => event.date > now);

    if (nextEvent) {
        // Optional: Update a label if you have one
        const label = document.getElementById('timer-label');
        if (label) label.innerText = `Next: ${nextEvent.name}`;

        // Start the timer
        startCountdown(nextEvent.date, timerElementId, () => {
            location.reload(); // Refresh page when event starts to unlock it!
        });
    } else {
        // Valentine's week is over
        const display = document.getElementById(timerElementId);
        if (display) display.innerText = "Week Complete! ❤️";
    }
}
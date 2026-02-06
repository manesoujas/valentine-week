/**
 * STORAGE MODULE
 * Handles saving and retrieving user data from the browser's Session Storage.
 * * Why sessionStorage? 
 * It persists data while the tab is open (so you can move from Login -> Dashboard),
 * but clears it immediately when the tab is closed. This is better for privacy.
 */

const KEYS = {
    NAME: 'val_user_name',
    PHOTO: 'val_user_photo'
};

/**
 * Saves the user's details.
 * @param {string} name - The name entered in the login form.
 * @param {string} photoBase64 - (Optional) The photo as a Base64 string.
 */
export function saveUserData(name, photoBase64) {
    if (name) {
        sessionStorage.setItem(KEYS.NAME, name);
    }
    if (photoBase64) {
        sessionStorage.setItem(KEYS.PHOTO, photoBase64);
    }
}

/**
 * Retrieves the current user's details.
 * @returns {Object} { name: string, photo: string|null }
 */
export function getUserData() {
    return {
        name: sessionStorage.getItem(KEYS.NAME),
        photo: sessionStorage.getItem(KEYS.PHOTO)
    };
}

/**
 * Checks if a user is currently logged in.
 * @returns {boolean} True if name exists.
 */
export function isUserLoggedIn() {
    return !!sessionStorage.getItem(KEYS.NAME);
}

/**
 * Wipes all data. 
 * Used when the user clicks "Exit Portal" or lands on index.html.
 */
export function clearData() {
    sessionStorage.removeItem(KEYS.NAME);
    sessionStorage.removeItem(KEYS.PHOTO);
    // Or simply: sessionStorage.clear();
}
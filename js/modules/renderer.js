/**
 * RENDERER MODULE
 * Handles DOM updates (Visual changes to the HTML).
 */

/**
 * Updates all placeholders with the user's name and photo.
 * @param {Object} user - The user object { name: "...", photo: "base64..." }
 */
export function renderUserData(user) {
    if (!user) return;

    // 1. Update Name(s)
    // We use querySelectorAll because the name might appear multiple times (Header + Letter)
    const nameElements = document.querySelectorAll('.dynamic-name');
    nameElements.forEach(el => {
        if (user.name) el.innerText = user.name;
    });

    // 2. Update Photo (Main Display)
    const photoImg = document.getElementById('user-photo-display');
    const photoFrame = document.getElementById('photo-frame');

    if (user.photo && photoImg) {
        photoImg.src = user.photo;
        // Show the frame container if it was hidden
        if (photoFrame) photoFrame.style.display = 'block';
    }

    // 3. Update Navbar/Small Photo (Dashboard)
    const navPhoto = document.getElementById('nav-photo-img');
    const navFrame = document.getElementById('nav-photo');
    if (user.photo && navPhoto) {
        navPhoto.src = user.photo;
        if (navFrame) navFrame.style.display = 'block';
    }
}

/**
 * Updates the styling of the file input on the Landing Page
 * when a user selects an image.
 * @param {HTMLInputElement} inputElement 
 * @param {HTMLElement} textElement - The <span> to update
 */
export function renderFilePreview(inputElement, textElement) {
    if (inputElement.files && inputElement.files[0]) {
        const fileName = inputElement.files[0].name;
        // Truncate long filenames for design
        const display = fileName.length > 20 ? fileName.substring(0, 17) + '...' : fileName;
        
        textElement.innerText = `Selected: ${display}`;
        textElement.parentElement.classList.add('file-selected'); // Add CSS class for styling
    }
}

/**
 * Switches the Color Theme of the website.
 * @param {string} themeName - e.g., 'passion-red', 'neon-love'
 */
export function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    
    // Optional: Save preference to storage if you want it to persist
    // localStorage.setItem('theme', themeName);
}
# 💘 The Valentine's Week Portal

A personalized, single-page application (SPA) designed to celebrate Valentine's Week. 
Built with a "Privacy-First" architecture: **No Database, No Cookies.**

## 🚀 Key Features

- **Ephemeral Data:** All user inputs (names, photos) exist only in the browser's RAM. A page refresh wipes the slate clean for privacy.
- **Dynamic Time-Locking:** Content for specific days (e.g., Chocolate Day) remains locked until that specific date arrives locally.
- **Theme Engine:** Real-time CSS variable switching for multiple color themes (Passion Red, Neon Love, etc.).
- **Downloadable Memories:** Users can generate and download cards since sharing links is impossible without a database.

## 🛠 Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Modular "7-1 Pattern" architecture with CSS Variables.
- **JavaScript (ES6+):** Module-based logic for state management and DOM manipulation.
- **Tools:** GitHub Pages for hosting.

## 📂 Project Structure

This project follows a modular architecture for maintainability:

```text
valentine-week-portal/
├── assets/         # Static media (Images, Audio, Vendor scripts)
├── css/            # Styled using the 7-1 Pattern
├── js/             # Logic split into ES6 Modules
└── index.html      # Single Entry Point
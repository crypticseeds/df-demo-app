/**
 * @fileoverview Demo App for DevOps Foundry
 * @author Femi Akinlotan <femi.akinlotan@devopsfoundry.com>
 * @copyright Copyright (c) 2024 DevOps Foundry
 * @license MIT
 */

// Add this to the top of your existing script.js
function updateDateTime() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Europe/London'
    };
    
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Europe/London'
    };

    const now = new Date();
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    dateElement.textContent = now.toLocaleDateString('en-GB', options);
    timeElement.textContent = now.toLocaleTimeString('en-GB', timeOptions);
}

// Update the time immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// DOM Elements
const modeToggleButton = document.querySelector('.mode-toggle');
const body = document.body;
const logo = document.querySelector('.logo');
const banner = document.querySelector('.banner');

// Image paths
const images = {
    light: {
        logo: 'images/logo-light.png',
        banner: 'images/banner-light.png',
        avatar: 'images/avatar-light.png'
    },
    dark: {
        logo: 'images/logo-dark.png',
        banner: 'images/banner-dark.png',
        avatar: 'images/avatar-dark.png'
    }
};

// Set initial mode
let isDarkMode = false;
body.classList.add('light-mode');

// Function to update images based on mode
function updateImages(darkMode) {
    const mode = darkMode ? 'dark' : 'light';
    logo.src = images[mode].logo;
    banner.src = images[mode].banner;
    document.querySelector('.avatar').src = images[mode].avatar;
}

// Function to update button text
function updateButtonText(darkMode) {
    modeToggleButton.textContent = darkMode 
        ? 'Switch to Light Mode' 
        : 'Switch to Dark Mode';
}

// Toggle mode function
function toggleMode() {
    isDarkMode = !isDarkMode;
    
    // Toggle body classes
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Update images and button text
    updateImages(isDarkMode);
    updateButtonText(isDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
}

// Add click event listener to button
modeToggleButton.addEventListener('click', toggleMode);

// Check for saved user preference
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        isDarkMode = savedMode === 'true';
        if (isDarkMode) {
            toggleMode();
        }
    }
});

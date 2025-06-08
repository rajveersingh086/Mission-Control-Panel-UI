function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    document.getElementById('mode-toggle').textContent = isLightMode ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('darkMode', !isLightMode);
}

function setActiveNavItem(currentPage) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.remove('light-mode');
        document.getElementById('mode-toggle').textContent = 'Light Mode';
    } else {
        document.body.classList.add('light-mode');
        document.getElementById('mode-toggle').textContent = 'Dark Mode';
    }
}